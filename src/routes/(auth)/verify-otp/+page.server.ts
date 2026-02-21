import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const email = url.searchParams.get('email');

	// If no email in URL, redirect to login
	if (!email) {
		redirect(302, '/login');
	}

	return {
		email
	};
}) satisfies PageServerLoad;

export const actions = {
	verifyOtp: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const email = String(data.get('email')).trim();
		const token = String(data.get('token')).trim();

		console.log('Verifying OTP:', { email, token, tokenLength: token.length }); // Debug log

		if (!email || !token) {
			return fail(400, {
				verifyOtp: {
					error: 'Email and verification code are required',
					values: { email, token }
				}
			});
		}

		// Use the same pattern as password login - let supabase handle session creation
		const { data: authData, error } = await supabase.auth.verifyOtp({
			email,
			token,
			type: 'email'
		});

		if (error) {
			console.log('OTP verification error:', error); // Debug log
			return fail(400, {
				verifyOtp: {
					error: error.message || 'Invalid verification code. Please try again.',
					values: { email, token: '' }
				}
			});
		}

		if (!authData.session) {
			return fail(400, {
				verifyOtp: {
					error: 'Failed to create session. Please try again.',
					values: { email, token: '' }
				}
			});
		}

		console.log('OTP verification successful');

		throw redirect(303, '/control');
	}
} satisfies Actions;
