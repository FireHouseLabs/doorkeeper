import "@supabase/ssr";
const load = async ({ fetch, depends, data }) => {
  depends("supabase:auth");
  return { supabase: null, session: null, profile: null };
};
export {
  load
};
