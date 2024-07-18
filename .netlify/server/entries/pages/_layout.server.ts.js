const load = async ({ locals: { getSession } }) => {
  const { data: profile, error } = await supabase.from("profiles").select("site_admin").eq("id", session.user.id).single();
  if (error) {
    console.error("Error fetching profile:", error);
  }
  return {
    session: await getSession(),
    site_admin: profile?.site_admin ?? false
  };
};
export {
  load
};
