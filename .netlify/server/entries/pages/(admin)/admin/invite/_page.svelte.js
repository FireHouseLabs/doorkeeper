import { c as create_ssr_component, e as escape, b as add_attribute } from "../../../../../chunks/ssr.js";
import "devalue";
import "../../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  return `${$$result.head += `<!-- HEAD_svelte-jiqncc_START -->${$$result.title = `<title>Invite User</title>`, ""}<!-- HEAD_svelte-jiqncc_END -->`, ""} <div class="flex h-full w-full flex-col items-center justify-start p-4"><form class="flex w-full flex-col gap-4 lg:w-1/4" action="" method="POST"><h1 class="text-2xl font-bold mb-4" data-svelte-h="svelte-12tpxa">Invite User</h1> <p class="text-gray-600 mb-6" data-svelte-h="svelte-nszarr">Enter the email address to send an invite link</p> ${form?.message !== void 0 ? `<div class="${"mb-4 p-3 rounded " + escape(
    form?.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
    true
  )}">${escape(form?.message)}</div>` : ``} <div><label class="flex flex-col gap-2 text-xs" for="email"><span data-svelte-h="svelte-ggvg3q">Email address</span> <input class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none" type="email" name="email" placeholder="User's email"${add_attribute("value", form?.email ?? "", 0)}></label> ${form?.errors?.email ? `<span class="text-red-500 text-sm mt-1 block">${escape(form?.errors?.email)}</span>` : ``}</div> <button type="submit" class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400" ${""}><div class="absolute flex w-full flex-col items-center">${`Send Invite`}</div></button></form></div>`;
});
export {
  Page as default
};
