// src/lib/utils/serviceSupabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SECRET_KEY } from '$env/static/private';

// Create service role client for admin operations (bypasses RLS)
export const serviceSupabase = createClient(
	PUBLIC_SUPABASE_URL, 
	SUPABASE_SECRET_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);