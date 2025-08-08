import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { failWithAuthError } from '$lib/utils/authErrorHandler';

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

		try {
			// Verify OTP using Supabase's built-in system
			const { data: authData, error: verifyError } = await supabase.auth.verifyOtp({
				email,
				token,
				type: 'email'
			});

			if (verifyError) {
				console.log('OTP verification error:', verifyError); // Debug log
				console.log('Error details:', { 
					message: verifyError.message, 
					status: verifyError.status, 
					code: verifyError.code 
				});
				return fail(400, {
					verifyOtp: {
						error: verifyError.message || 'Invalid verification code. Please try again.',
						values: { email, token: '' } // Clear token on error
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

			// OTP verification successful
			console.log('OTP verification successful, redirecting to /control');

		} catch (error) {
			console.error('Unexpected error in verifyOtp:', error); // Debug log
			return failWithAuthError(
				error, 
				'verifyOtp', 
				'Server error. Please try again.',
				{ email, token: '' },
				500
			);
		}

		// Success - redirect to control panel (outside try/catch)
		throw redirect(303, '/control');
	}
} satisfies Actions;