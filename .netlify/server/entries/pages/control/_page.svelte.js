import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${`<div class="flex min-h-screen items-center justify-center"><div class="mx-auto max-w-md rounded-lg border-2 border-red-600 bg-red-100 p-6 text-center"><h1 class="mb-2 text-3xl font-bold text-red-600" data-svelte-h="svelte-c3hnas">Access Denied</h1> <p class="mb-2 text-lg text-black" data-svelte-h="svelte-19l992t">You are not within range of Moorooduc Fire Station.</p> ${``}</div></div>`}`;
});
export {
  Page as default
};
