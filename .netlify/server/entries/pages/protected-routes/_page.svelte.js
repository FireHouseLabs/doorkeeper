import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="w-screen p-4 pt-40 lg:px-16" data-svelte-h="svelte-6wfk6">Protected Routes</div>`;
});
export {
  Page as default
};
