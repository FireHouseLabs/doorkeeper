// src/lib/utils/customOtp.ts
import type { SupabaseClient } from '@supabase/supabase-js';
import { serviceSupabase } from './serviceSupabase';

// Generate a 6-digit numeric code
export function generateOtpCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP code in database with expiration
export async function storeOtpCode(
	_supabase: SupabaseClient,
	email: string,
	code: string
): Promise<{ error: any }> {
	const expiresAt = new Date();
	expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minute expiration

	// Use service role client to bypass RLS
	const { error } = await serviceSupabase
		.from('otp_codes')
		.upsert({
			email: email.toLowerCase(),
			code,
			expires_at: expiresAt.toISOString(),
			created_at: new Date().toISOString()
		}, {
			onConflict: 'email'
		});

	return { error };
}

// Verify OTP code from database
export async function verifyOtpCode(
	_supabase: SupabaseClient,
	email: string,
	code: string
): Promise<{ success: boolean; error?: string }> {
	// Use service role client to bypass RLS
	const { data, error } = await serviceSupabase
		.from('otp_codes')
		.select('*')
		.eq('email', email.toLowerCase())
		.eq('code', code)
		.single();

	if (error) {
		return { success: false, error: 'Invalid or expired code' };
	}

	// Check if code has expired
	const now = new Date();
	const expiresAt = new Date(data.expires_at);
	
	if (now > expiresAt) {
		// Clean up expired code using service role
		await serviceSupabase
			.from('otp_codes')
			.delete()
			.eq('email', email.toLowerCase());
		
		return { success: false, error: 'Code has expired. Please request a new one.' };
	}

	// Clean up used code using service role
	await serviceSupabase
		.from('otp_codes')
		.delete()
		.eq('email', email.toLowerCase());

	return { success: true };
}

// Send OTP email with numeric code only (no magic link)
export async function sendOtpEmail(
	supabase: SupabaseClient,
	email: string,
	code: string,
	siteUrl: string
): Promise<{ error: any }> {
	// For now, we'll use Supabase's built-in email but modify the approach
	// The email template should be configured in Supabase dashboard to show:
	// - The numeric code: {{ .Token }}
	// - A safe link to login page: {{ .SiteURL }}/login?method=otp&email={{ .Email }}
	// - Instructions to manually enter the code
	
	console.log(`Sending OTP ${code} to ${email} for site ${siteUrl}`);
	
	// We'll use resetPasswordForEmail but with a custom redirect that doesn't consume the token
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${siteUrl}/login?method=otp&email=${encodeURIComponent(email)}&info=code-sent`
	});

	return { error };
}