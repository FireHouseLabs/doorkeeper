import { f as fail, r as redirect } from "../../../../chunks/index.js";
const load = async () => {
  return {};
};
const actions = {
  default: async ({ url, request, locals: { supabase } }) => {
    const result = await getEmailandPassword(request);
    if (isTypeAuthRequestData(result)) {
      const { email, password } = result;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${url.origin}/api/auth/callback` }
      });
      if (error) {
        return fail(500, { message: "Server error. Try again later.", success: false, email });
      }
      redirect(303, "/email-confirm");
    }
  }
};
async function getEmailandPassword(request) {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  if (!email) {
    return fail(400, {
      error: "Please enter your email"
    });
  }
  if (!password) {
    return fail(400, {
      error: "Please enter a password",
      values: {
        email
      }
    });
  }
  return { email, password };
}
function isTypeAuthRequestData(data) {
  return typeof data == "object" && data != null && "email" in data && "password" in data && typeof data.email == "string" && typeof data.password == "string";
}
export {
  actions,
  load
};
