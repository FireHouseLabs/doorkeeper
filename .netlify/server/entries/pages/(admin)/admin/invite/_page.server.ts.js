import { r as redirect, f as fail } from "../../../../../chunks/index.js";
import { createClient } from "@supabase/supabase-js";
import { P as PUBLIC_SUPABASE_URL, a as PUBLIC_SUPABASE_SERVICE_KEY } from "../../../../../chunks/public.js";
const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = PUBLIC_SUPABASE_SERVICE_KEY;
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    redirect(303, "/");
  }
  return {};
};
const actions = {
  default: async (event) => {
    const { request } = event;
    const formData = await request.formData();
    const email = formData.get("email");
    const validEmail = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email);
    if (!validEmail) {
      return fail(400, { errors: { email: "Please enter a valid email address" }, email });
    }
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email);
    if (error) {
      return fail(400, {
        success: false,
        email,
        message: `There was an issue sending the invite. Please try again.`
      });
    }
    return {
      success: true,
      message: "Invite sent successfully to " + email + "."
    };
  }
};
export {
  actions,
  load
};
