import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/login');
	}
	const { data: tableData } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
	return {
		tableData
	};
}) satisfies PageServerLoad;
