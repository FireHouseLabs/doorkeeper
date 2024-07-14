import { c as create_ssr_component, a as each, b as add_attribute, e as escape } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="container mx-auto p-4"><h1 class="text-2xl font-bold mb-4" data-svelte-h="svelte-1t9o12v">Entry Logs</h1> <div class="overflow-x-auto"><table class="table w-full"><thead data-svelte-h="svelte-1fvingp"><tr><th>Timestamp</th> <th>User Email</th> <th>Door Name</th> <th>Status</th></tr></thead> <tbody>${each(data.logs, (log) => {
    return `<tr${add_attribute("class", log.status ? "bg-green-100 text-grey-900" : "bg-red-100", 0)}><td>${escape(new Date(log.created_at).toLocaleString())}</td> <td>${escape(log.user_email)}</td> <td>${escape(log.door_name)}</td> <td>${log.status ? `<span class="badge badge-success" data-svelte-h="svelte-1waor36">Success</span>` : `<span class="badge badge-error" data-svelte-h="svelte-7xm36v">Failed</span>`}</td> </tr>`;
  })}</tbody></table></div></div>`;
});
export {
  Page as default
};
