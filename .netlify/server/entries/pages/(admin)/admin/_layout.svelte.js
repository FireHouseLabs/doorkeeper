import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
import { r as redirect } from "../../../../chunks/index.js";
import "../../../../chunks/client.js";
const load = async ({ parent }) => {
  const { session, supabase } = await parent();
  if (!session) {
    console.log("Access Denied");
    throw redirect(303, "/");
  }
  const { data: profile } = await supabase.from("profiles").select("site_admin").eq("id", session.user.id).single();
  if (!profile?.site_admin) {
    return {
      forbidden: true,
      message: "You must be an administrator to access this page."
    };
  }
  return {
    user: session.user,
    site_admin: profile.site_admin
  };
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { forbidden } = $$props;
  let { message } = $$props;
  let { user } = $$props;
  if ($$props.forbidden === void 0 && $$bindings.forbidden && forbidden !== void 0) $$bindings.forbidden(forbidden);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0) $$bindings.message(message);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  return `${forbidden ? `<div class="flex min-h-screen items-center justify-center bg-gray-100 p-4"><div class="mx-auto max-w-md rounded-lg border-2 border-red-600 bg-red-100 p-6 text-center shadow-lg"><h1 class="mb-2 text-3xl font-bold text-red-600" data-svelte-h="svelte-c3hnas">Access Denied</h1> <p class="mb-4 text-lg text-black">${escape(message)}</p> <button class="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700" data-svelte-h="svelte-1sftccu">Return to Control Interface</button></div></div>` : `${slots.default ? slots.default({}) : ``}`}`;
});
export {
  Layout as default,
  load
};
