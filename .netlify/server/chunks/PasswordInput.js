import { c as create_ssr_component, b as add_attribute, v as validate_component } from "./ssr.js";
const EyeClosedIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} viewBox="0 0 16 16"><path fill="currentColor" d="M8 11c-1.65 0-3-1.35-3-3s1.35-3 3-3s3 1.35 3 3s-1.35 3-3 3m0-5c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"></path><path fill="currentColor" d="M8 13c-3.19 0-5.99-1.94-6.97-4.84a.442.442 0 0 1 0-.32C2.01 4.95 4.82 3 8 3s5.99 1.94 6.97 4.84c.04.1.04.22 0 .32C13.99 11.05 11.18 13 8 13M2.03 8c.89 2.4 3.27 4 5.97 4s5.07-1.6 5.97-4C13.08 5.6 10.7 4 8 4S2.93 5.6 2.03 8"></path><path fill="currentColor" d="M14 14.5a.47.47 0 0 1-.35-.15l-12-12c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l11.99 12.01c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"></path></svg>`;
});
const PasswordInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { value = "" } = $$props;
  let { name = "password" } = $$props;
  let input;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  return `<div class="flex w-full flex-col"><label class="relative flex flex-col gap-2 text-xs"${add_attribute("for", name, 0)}><span data-svelte-h="svelte-1kvjhoz">Password</span> <input${add_attribute("id", name, 0)} class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none" type="password"${add_attribute("name", name, 0)}${add_attribute("value", value, 0)}${add_attribute("this", input, 0)}> ${`<button class="absolute bottom-4 right-10 z-50">${validate_component(EyeClosedIcon, "EyeClosedIcon").$$render($$result, {}, {}, {})}</button>`}</label></div>`;
});
export {
  PasswordInput as P
};
