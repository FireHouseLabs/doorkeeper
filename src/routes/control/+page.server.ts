import { fail, redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import { authenticate, getToken } from '$lib/services/inceptionAuthService';
import {
	MAX_LOCATION_ACCURACY_METRES,
	MAX_PLAUSIBLE_SPEED_MPS,
	MIN_JUMP_DISTANCE_METRES,
	SITE_MAX_DISTANCE_METRES,
	calculateDistance
} from '$lib/common/geo';
import type { PageServerLoad } from '../$types';
import { PRIVATE_INCEPTION_BASE_URL } from '$env/static/private';
import { PUBLIC_SITE_LATITUDE, PUBLIC_SITE_LONGITUDE } from '$env/static/public';
import { supabase } from '$lib/supabaseClient';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/login');
	}
	return {};
}) satisfies PageServerLoad;

const baseUrl = PRIVATE_INCEPTION_BASE_URL;

const siteLocation = {
	latitude: Number(PUBLIC_SITE_LATITUDE),
	longitude: Number(PUBLIC_SITE_LONGITUDE)
};

interface PositionReport {
	latitude: number;
	longitude: number;
	at: number;
}

/**
 * The last position each user claimed, kept for the implausible-travel check. Module-level like
 * the Inception token cache, so it is best-effort only: it is empty after a cold start and is not
 * shared between concurrent serverless instances. Treat a pass here as "not obviously forged",
 * never as proof of presence.
 */
const lastReportedPosition = new Map<string, PositionReport>();

type LocationCheck = { ok: true } | { ok: false; reason: string };

/**
 * Re-runs the proximity check server-side on the coordinates the browser reported. The browser is
 * still the source of those numbers and can lie about them, so this raises the cost of a bypass
 * from "POST to the endpoint" to "deliberately spoof a plausible position" — it is not proof the
 * caller is on site.
 */
function checkReportedLocation(userId: string, formData: FormData): LocationCheck {
	const latitude = Number(formData.get('latitude'));
	const longitude = Number(formData.get('longitude'));
	const accuracy = Number(formData.get('accuracy'));

	if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
		return {
			ok: false,
			reason: 'Your location could not be confirmed. Allow location access and try again.'
		};
	}

	if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
		return { ok: false, reason: 'The location your device reported is not a valid position.' };
	}

	if (!Number.isFinite(accuracy) || accuracy <= 0 || accuracy > MAX_LOCATION_ACCURACY_METRES) {
		return {
			ok: false,
			reason:
				'Your location is not accurate enough to confirm you are at the station. Move outside and try again.'
		};
	}

	// Record every report, including ones that go on to fail the fence, so that claiming to be
	// far away and then claiming to be on site moments later is visible as a jump.
	const now = Date.now();
	const previous = lastReportedPosition.get(userId);
	lastReportedPosition.set(userId, { latitude, longitude, at: now });

	if (previous) {
		const jump = calculateDistance(previous.latitude, previous.longitude, latitude, longitude);
		const elapsedSeconds = Math.max((now - previous.at) / 1000, 1);
		if (jump > MIN_JUMP_DISTANCE_METRES && jump / elapsedSeconds > MAX_PLAUSIBLE_SPEED_MPS) {
			console.warn(
				`Implausible location change for user ${userId}: ${Math.round(jump)} m in ${Math.round(elapsedSeconds)} s`
			);
			return { ok: false, reason: 'Your reported location changed too quickly to be trusted.' };
		}
	}

	const distance = calculateDistance(
		latitude,
		longitude,
		siteLocation.latitude,
		siteLocation.longitude
	);

	if (distance > SITE_MAX_DISTANCE_METRES) {
		return { ok: false, reason: 'You are not within range of Moorooduc Fire Station.' };
	}

	return { ok: true };
}

async function logEntry(session: Session, doorId: string, doorName: string, status: boolean) {
	const { error } = await supabase.from('entry_logs').insert({
		user: session.user.id,
		user_email: session.user.email,
		door_name: doorName,
		door_id: doorId,
		status
	});

	if (error) {
		console.error('Error inserting entry log:', error);
	}

	return !error;
}

async function controlDoor(id: string, token: string) {
	const url = `${baseUrl}/api/v1/control/door/${id}/activity`;
	const body = {
		Type: 'ControlDoor',
		DoorControlType: 'Open',
		Entity: id
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `LoginSessId=${token}`
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Failed to control the door:', response.status, response.statusText, errorText);
			throw new Error(`Failed to control the door: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error in controlDoor:', error);
		throw error;
	}
}

export const actions: Actions = {
	control: async ({ request, locals: { getSession } }: RequestEvent) => {
		const session = await getSession();
		if (!session) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const doorId = formData.get('doorId') as string;
		const doorName = formData.get('doorName') as string; // Ensure the door name is also sent

		const locationCheck = checkReportedLocation(session.user.id, formData);
		if (!locationCheck.ok) {
			console.warn(`Door open denied for ${session.user.email}: ${locationCheck.reason}`);
			await logEntry(session, doorId, doorName, false);
			return fail(403, { success: false, error: locationCheck.reason });
		}

		let token = getToken();
		if (!token) {
			token = await authenticate();
		}

		if (!token) {
			return fail(502, { success: false, error: 'Failed to obtain authentication token' });
		}

		try {
			const result = await controlDoor(doorId, token);

			// Insert a record into the Supabase entry_logs table
			if (!(await logEntry(session, doorId, doorName, true))) {
				return fail(500, { success: false, error: 'Failed to log entry' });
			}

			return { success: true, result };
		} catch (error) {
			console.error('Failed to execute control action:', error);

			// Insert a record into the Supabase entry_logs table with status false
			await logEntry(session, doorId, doorName, false);

			return fail(502, { success: false, error: (error as Error).message });
		}
	}
};
