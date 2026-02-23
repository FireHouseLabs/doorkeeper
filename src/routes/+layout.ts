// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createBrowserClient } from '@supabase/ssr';
import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	// Create browser client with proper cookie handling
	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		global: {
			fetch
		},
		cookies: {
			get(key: string) {
				if (!browser) {
					return null;
				}
				const cookie = document.cookie
					.split('; ')
					.find((row) => row.startsWith(`${key}=`))
					?.split('=')[1];
				return cookie || null;
			},
			set(key: string, value: string, options: any) {
				if (!browser) return;
				let cookieStr = `${key}=${value}; path=${options?.path || '/'}`;
				if (options?.maxAge) {
					cookieStr += `; max-age=${options.maxAge}`;
				}
				if (options?.domain) {
					cookieStr += `; domain=${options.domain}`;
				}
				if (options?.secure) {
					cookieStr += '; secure';
				}
				if (options?.sameSite) {
					cookieStr += `; samesite=${options.sameSite}`;
				}
				if (options?.httpOnly) {
					cookieStr += '; httponly';
				}
				document.cookie = cookieStr;
			},
			remove(key: string, options: any) {
				if (!browser) return;
				document.cookie = `${key}=; path=${options?.path || '/'}; max-age=0`;
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
