import { r as redirect } from "../../../../chunks/index.js";
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    redirect(302, "/login");
  }
  return {};
};
const actions = {
  default: async ({ locals: { supabase }, request }) => {
    const requestData = await request.formData();
    const password = String(requestData.get("password"));
    const confirm = requestData.get("confirm-password");
    if (password && confirm && password == confirm) {
      await supabase.auth.updateUser({ password });
      redirect(303, "/control");
    }
  }
};
export {
  actions,
  load
};
