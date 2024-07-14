import { c as create_ssr_component, e as escape } from "../../../chunks/ssr.js";
async function loadData() {
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let supabase;
  let session;
  let { data } = $$props;
  let loadedData = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ supabase, session } = data);
  {
    if (session) {
      loadData();
    }
  }
  return `  <div class="w-screen p-4 pt-40 lg:px-16">${session ? `<p data-svelte-h="svelte-1u15duc">client-side data fetching with RLS</p> <pre>${escape(JSON.stringify(loadedData, null, 2))}</pre>` : ``}</div>`;
});
export {
  Page as default
};
