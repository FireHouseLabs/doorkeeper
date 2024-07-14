import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    redirect(303, "/");
  }
  return {};
};
export {
  load
};
