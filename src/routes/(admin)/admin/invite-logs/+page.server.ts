import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { supabase } = locals;

    const { data, error } = await supabase
        .from('invite_logs')
        .select('created_at, invited_address, invited_by, profiles!invite_logs_invited_by_fkey ( email )')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching entry logs:', error);
        return { logs: [] };
    }

    return { logs: data };
};
