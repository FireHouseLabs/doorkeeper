import { fail, redirect } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICE_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = PUBLIC_SUPABASE_SERVICE_KEY;

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);

    if (!validEmail) {
      return fail(400, { errors: { email: 'Please enter a valid email address' }, email });
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Supabase URL or Service Role Key not set");
      return fail(500, {
        success: false,
        message: "Server configuration error. Please contact support.",
      });
    }

    // Create a separate client with the service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);

    if (error) {
      return fail(400, {
        success: false,
        email,
        message: `There was an issue sending the invite. Please try again.`,
      });
    }

    return {
      success: true,
      message: "Invite sent successfully to " + email + ".",
    };
  }
};
