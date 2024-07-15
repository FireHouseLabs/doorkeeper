import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import { P as PasswordInput } from "../../../../chunks/PasswordInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex h-full w-full flex-col items-center justify-start p-4"><form class="flex w-full flex-col gap-4 lg:w-1/4" method="POST"><div data-svelte-h="svelte-40h9h1"><label class="flex flex-col gap-2 text-xs" for="name"><span>Email</span> <input class="rounded bg-zinc-100 px-2 py-4 text-sm focus:outline-none" type="text" name="email"></label></div> ${validate_component(PasswordInput, "PasswordInput").$$render($$result, {}, {}, {})} <div class="my-4"></div> <button class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"><div class="absolute flex w-full flex-col items-center">${`Signup`}</div></button> <span class="text-sm font-semibold tracking-tight" data-svelte-h="svelte-1fwo1mf">Already a user? <a class="text-green-600 hover:underline" href="/login">Login</a></span></form></div>`;
});
export {
  Page as default
};
