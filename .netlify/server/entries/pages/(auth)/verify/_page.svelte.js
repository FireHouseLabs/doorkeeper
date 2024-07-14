import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let token = "";
  return `  <main class="flex h-full w-full flex-col items-center justify-start p-4"><h1 class="text-lg font-semibold" data-svelte-h="svelte-1tchdri">Verify Signup</h1> <form class="flex w-full flex-col gap-4 lg:w-1/4"><div><label class="flex flex-col gap-2 text-xs" for="token"><span data-svelte-h="svelte-c45vng">Verification Token</span> <input class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none" type="text" id="token" required readonly${add_attribute("value", token, 0)}></label></div> <button type="submit" class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400" data-svelte-h="svelte-14a5g15">Validate</button></form></main>`;
});
export {
  Page as default
};
