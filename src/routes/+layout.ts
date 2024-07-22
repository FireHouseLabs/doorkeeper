// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { SupabaseClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import type { LayoutLoad } from './$types';

type Profile = {
	site_admin: boolean;
  };

export const load: LayoutLoad = async ({ fetch, depends, data }) => {
	depends('supabase:auth');
	let supabase: SupabaseClient;
	let profile: Profile | null = null;

	if (browser) {
		supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			},
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return JSON.stringify(data.session);
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			}
		});

		const {
			data: { session }
		  } = await supabase.auth.getSession();
	  
		  if (session?.user) {
			const { data, error } = await supabase
			  .from('profiles')
			  .select('site_admin')
			  .eq('id', session.user.id)
			  .single();
	  
			if (error) {
			  console.error('Error fetching profile:', error);
			} else {
			  profile = data;
			}
		  }
	  
		  return { supabase, session, profile };
		}
		
	return { supabase: null, session: null, profile: null };
};
