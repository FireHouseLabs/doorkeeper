import { redirect } from '@sveltejs/kit';

// Modern PKCE auth callback - handles email confirmation and password reset flows
export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		// Exchange the code for a session - Supabase handles all cookie management
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			throw redirect(303, next);
		}
	}

	// Handle auth callback errors
	throw redirect(303, '/auth-code-error');
};

// Corporate-safe password reset token validation (for /verify page) - RESTORED ORIGINAL
export const POST = async ({ request, locals: { supabase } }) => {
	console.log('POST request received'); // Debug log
	const { email: encodedEmail, token } = await request.json();
	const email = decodeURIComponent(encodedEmail);
	console.log('Received email:', email, 'Received token:', token); // Debug log
	const next = '/update-password';

	if (token && email) {
		console.log('Verifying OTP'); // Debug log
		const { data, error } = await supabase.auth.verifyOtp({ email: email, token: token, type: 'email' });

		if (error) {
			console.error('OTP verification error:', error.message); // Debug log
		} else {
			console.log('OTP verification data:', data); // Debug log
		}

		if (!error && data && data.session) {
			const { session } = data;
			return new Response(null, {
				status: 303,
				headers: {
					'set-cookie': `session=${session.access_token}; HttpOnly; Path=/; SameSite=Lax`,
					'location': next,
				}
			});
		}
	}

	// Redirect to an error page if OTP validation fails
	console.log('OTP validation failed or missing data'); // Debug log
	throw redirect(303, '/auth-code-error');
};