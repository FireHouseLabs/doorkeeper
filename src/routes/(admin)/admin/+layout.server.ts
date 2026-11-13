import { redirect, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient'; // Adjust the path to your Supabase client
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	console.log('[Admin Layout] Session:', session ? 'found' : 'null');

	if (!session) {
		console.log('[Admin Layout] No session, redirecting to /');
		throw redirect(303, '/');
	}

	// Query Supabase to check if the current user is an admin
	const { data, error: dbError } = await supabase
		.from('profiles')
		.select('site_admin')
		.eq('id', session.user.id)
		.single();

	console.log('[Admin Layout] Profile data:', data, 'Error:', dbError);

	if (dbError || !data?.site_admin) {
		throw error(403, 'Access Denied: You must be an administrator to access this page.');
	}

	return {
		user: session.user,
		site_admin: data.site_admin
	};
};
