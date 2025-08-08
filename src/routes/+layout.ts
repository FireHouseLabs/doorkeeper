// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	// Create browser client with simplified configuration
	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch,
		},
		cookies: {
			get(key) {
				if (!browser) {
					return null;
				}
				// Simple cookie parsing for browser environment
				const cookies = document.cookie
					.split('; ')
					.find(row => row.startsWith(`${key}=`))
					?.split('=')[1];
				return cookies || null;
			}
		}
	});

	// Return consistent data structure with server data
	return {
		supabase,
		session: data.session,
		profile: data.profile
	};
};
