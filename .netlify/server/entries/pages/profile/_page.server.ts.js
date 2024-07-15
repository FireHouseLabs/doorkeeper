import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();
  if (!session) {
    throw redirect(303, "/login");
  }
  return {
    user: session.user
    //tableData
  };
};
export {
  load
};
