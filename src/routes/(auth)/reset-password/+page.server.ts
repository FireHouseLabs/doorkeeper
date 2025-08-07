import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	default: async ({ locals: { supabase }, request, url }) => {
		const requestData = await request.formData();
		const email = String(requestData.get('email')).trim();

		// Validate email input
		if (!email) {
			return fail(400, {
				resetPassword: {
					error: 'Please enter your email address',
					values: { email }
				}
			});
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				resetPassword: {
					error: 'Please enter a valid email address',
					values: { email }
				}
			});
		}

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${url.origin}/api/auth/callback?next=/update-password`
			});

			if (error) {
				// Handle specific Supabase errors
				if (error instanceof AuthApiError) {
					// Rate limiting or other API errors
					if (error.status === 429) {
						return fail(429, {
							resetPassword: {
								error: 'Too many requests. Please wait a minute before trying again.',
								values: { email }
							}
						});
					}
					return fail(400, {
						resetPassword: {
							error: error.message || 'Failed to send reset email. Please try again.',
							values: { email }
						}
					});
				}
				throw error; // Re-throw unknown errors
			}

			// Success - redirect to confirmation page
			redirect(303, '/email-confirm');
		} catch (error) {
			// Handle unexpected errors
			return fail(500, {
				resetPassword: {
					error: 'Server error. Please check your connection and try again.',
					values: { email }
				}
			});
		}
	}
} satisfies Actions;
