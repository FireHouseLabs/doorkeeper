import { r as redirect, e as error } from "../../../../chunks/index.js";
import { s as supabase } from "../../../../chunks/supabaseClient.js";
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    console.log("Access Denied");
    throw redirect(303, "/");
  }
  const { data, error: dbError } = await supabase.from("profiles").select("site_admin").eq("id", session.user.id).single();
  if (dbError || !data?.site_admin) {
    console.log("Access Denied: User is not an admin");
    throw error(403, "Access Denied: You must be an administrator to access this page.");
  }
  return {
    user: session.user,
    site_admin: data.site_admin
  };
};
export {
  load
};
