const load = async ({ locals }) => {
  const { supabase } = locals;
  const { data, error } = await supabase.from("entry_logs").select("created_at, user_email, door_name, status").order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching entry logs:", error);
    return { logs: [] };
  }
  return { logs: data };
};
export {
  load
};
