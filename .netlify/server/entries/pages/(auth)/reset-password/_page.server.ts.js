import { r as redirect } from "../../../../chunks/index.js";
const actions = {
  default: async ({ locals: { supabase }, request, url }) => {
    const requestData = await request.formData();
    const email = String(requestData.get("email"));
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/update-password`
    });
    redirect(303, "/email-confirm");
  }
};
export {
  actions
};
