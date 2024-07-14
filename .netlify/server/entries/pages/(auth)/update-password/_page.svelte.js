import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "devalue";
import "../../../../chunks/client.js";
import { P as PasswordInput } from "../../../../chunks/PasswordInput.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex h-full w-full flex-col items-center justify-start p-4"><h1 class="mb-4 text-3xl font-bold" data-svelte-h="svelte-29liah">Update Password</h1> <p class="mb-4 text-lg" data-svelte-h="svelte-l8u508">Set a password for your account to access DoorKeeper.</p> <form class="flex w-full flex-col gap-4 lg:w-1/4" method="POST">${validate_component(PasswordInput, "PasswordInput").$$render($$result, {}, {}, {})} ${validate_component(PasswordInput, "PasswordInput").$$render($$result, { name: "confirm-password" }, {}, {})} <div class="my-4"></div> <button class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"><span class="absolute flex w-full flex-col items-center">${`Update Password`}</span></button></form></div>`;
});
export {
  Page as default
};
