// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

type Profile = {
	site_admin: boolean;
};

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	let profile: Profile | null = null;

	// Fetch user profile on server-side for better performance
	if (session?.user) {
		const { data, error } = await supabase
			.from('profiles')
			.select('site_admin')
			.eq('id', session.user.id)
			.single();

		if (!error && data) {
			profile = data;
		}
	}

	return {
		session,
		profile
	};
};