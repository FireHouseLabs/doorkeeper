import { f as fail } from "../../../../chunks/index.js";
import { AuthApiError } from "@supabase/supabase-js";
const load = async () => {
  return {};
};
const actions = {
  login: async ({ request, locals: { supabase } }) => {
    const result = await getEmailandPassword(request);
    if (isTypeAuthRequestData(result)) {
      const { email, password } = result;
      try {
        const { data } = await supabase.auth.signInWithPassword({ email, password });
        return {
          status: 200,
          data
        };
      } catch (error) {
        console.log("Error", error);
        if (error instanceof AuthApiError && error.status === 400) {
          return fail(400, {
            signinWithPassword: {
              error: "Invalid credentials.",
              values: {
                email
              }
            }
          });
        }
        if (error) {
          return fail(500, {
            signinWithPassword: {
              error: "Server error. Try again later.",
              values: {
                email
              }
            }
          });
        }
      }
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
