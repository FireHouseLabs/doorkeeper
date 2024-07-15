import { r as redirect } from "../../../../../chunks/index.js";
const GET = async ({ url }) => {
  const email = url.searchParams.get("email");
  const token = url.searchParams.get("token");
  if (email && token) {
    return new Response(JSON.stringify({ email, token }), {
      headers: { "Content-Type": "application/json" }
    });
  } else {
    throw redirect(303, "/auth-code-error");
  }
};
const POST = async ({ request, locals: { supabase } }) => {
  console.log("POST request received");
  const { email: encodedEmail, token } = await request.json();
  const email = decodeURIComponent(encodedEmail);
  console.log("Received email:", email, "Received token:", token);
  const next = "/update-password";
  if (token && email) {
    console.log("Verifying OTP");
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
    if (error) {
      console.error("OTP verification error:", error.message);
    } else {
      console.log("OTP verification data:", data);
    }
    if (!error && data && data.session) {
      const { session } = data;
      return new Response(null, {
        status: 303,
        headers: {
          "set-cookie": `session=${session.access_token}; HttpOnly; Path=/; SameSite=Lax`,
          "location": next
        }
      });
    }
  }
  console.log("OTP validation failed or missing data");
  throw redirect(303, "/auth-code-error");
};
export {
  GET,
  POST
};
