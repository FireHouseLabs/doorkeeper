// src/lib/utils/serviceSupabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_SERVICE_KEY } from '$env/static/public';

// Create service role client for admin operations (bypasses RLS)
export const serviceSupabase = createClient(
	PUBLIC_SUPABASE_URL, 
	PUBLIC_SUPABASE_SERVICE_KEY,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	}
);