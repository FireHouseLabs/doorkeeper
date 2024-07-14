import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import { P as PasswordInput } from "../../../../chunks/PasswordInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex h-full w-full flex-col items-center justify-start p-4"><form class="flex w-full flex-col gap-4 lg:w-1/4" action="?/login" method="POST"><div data-svelte-h="svelte-12lf7qy"><label class="flex flex-col gap-2 text-xs" for="email"><span>Email</span> <input class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none" type="email" name="email" required></label></div> ${validate_component(PasswordInput, "PasswordInput").$$render($$result, {}, {}, {})} <div class="my-"></div> <button type="submit" class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"><div class="absolute flex w-full flex-col items-center">${`Login`}</div></button> <div class="flex flex-row items-center justify-center" data-svelte-h="svelte-un6gty"><a class="text-center text-xs font-semibold tracking-tight text-green-600 hover:underline" aria-label="forgot password" href="reset-password">Forgot Password?</a></div></form></div>`;
});
export {
  Page as default
};
