import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(303, '/login');
	}
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

		if (!validEmail) {
			return fail(400, { errors: { email: 'Please enter a valid email address' }, email });
		}

		const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
			redirectTo: 'http://localhost:5174/api/auth/callback'
		});

		if (error) {
			return fail(400, {
				success: false,
				email,
				message: `There was an issue sending the invite. Please try again.`,
			});
		}

		return {
			success: true,
			message: "Invite sent successfully. Please check the user's email.",
		};
	}
};
