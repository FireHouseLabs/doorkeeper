// src/lib/utils/authErrorHandler.ts
import { AuthApiError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';

export interface AuthErrorResponse {
	error: string;
	values?: Record<string, any>;
}

/**
 * Centralized authentication error handler
 * Converts Supabase auth errors into user-friendly messages
 */
export function handleAuthError(
	error: any, 
	defaultMessage = 'An unexpected error occurred',
	preserveValues: Record<string, any> = {}
): AuthErrorResponse {
	let userMessage = defaultMessage;

	if (error instanceof AuthApiError) {
		switch (error.status) {
			case 400:
				// Bad request - usually invalid credentials or malformed data
				if (error.message.includes('Invalid login credentials')) {
					userMessage = 'Invalid credentials. Please check your email and password.';
				} else if (error.message.includes('Email not confirmed')) {
					userMessage = 'Please check your email and click the confirmation link before logging in.';
				} else if (error.message.includes('signups not allowed')) {
					userMessage = 'Account registration is currently disabled.';
				} else if (error.message.includes('Invalid code')) {
					userMessage = 'Invalid verification code. Please check and try again.';
				} else if (error.message.includes('expired')) {
					userMessage = 'Verification code has expired. Please request a new one.';
				} else {
					userMessage = 'Invalid request. Please check your input and try again.';
				}
				break;
			case 422:
				// Unprocessable entity - usually validation errors
				if (error.message.includes('Password')) {
					userMessage = 'Password does not meet requirements. Please choose a stronger password.';
				} else if (error.message.includes('email')) {
					userMessage = 'Please enter a valid email address.';
				} else {
					userMessage = 'Invalid input. Please check your information and try again.';
				}
				break;
			case 429:
				// Rate limiting
				userMessage = 'Too many attempts. Please wait a moment before trying again.';
				break;
			case 500:
			case 502:
			case 503:
			case 504:
				// Server errors
				userMessage = 'Server error. Please try again later or check your connection.';
				break;
			default:
				// Use the error message from Supabase if available, otherwise use default
				userMessage = error.message || defaultMessage;
		}
	} else if (error && typeof error === 'object' && 'message' in error) {
		// Handle other error types with message property
		userMessage = error.message;
	}

	return {
		error: userMessage,
		...(Object.keys(preserveValues).length > 0 && { values: preserveValues })
	};
}

/**
 * Creates a SvelteKit fail response with centralized auth error handling
 */
export function failWithAuthError(
	error: any,
	actionName: string,
	defaultMessage = 'An unexpected error occurred',
	preserveValues: Record<string, any> = {},
	statusCode = 400
) {
	const errorResponse = handleAuthError(error, defaultMessage, preserveValues);
	
	return fail(statusCode, {
		[actionName]: errorResponse
	});
}