import { error, redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';

/**
 * Server-side admin guard. Form actions do NOT run layout `load` functions, so every admin
 * action (and load, for defence in depth) must call this itself.
 */
export async function requireAdmin(getSession: () => Promise<Session | null>): Promise<Session> {
	const session = await getSession();
	if (!session) throw redirect(303, '/login');

	const { data, error: dbError } = await supabase
		.from('profiles')
		.select('site_admin')
		.eq('id', session.user.id)
		.single();

	if (dbError || !data?.site_admin) {
		throw error(403, 'Access Denied: You must be an administrator to perform this action.');
	}

	return session;
}
