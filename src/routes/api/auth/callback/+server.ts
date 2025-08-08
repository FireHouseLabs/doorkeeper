import { redirect, json } from '@sveltejs/kit';

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

// Corporate-safe password reset token validation (for /verify page)
export const POST = async ({ request, locals: { supabase } }) => {
	try {
		const { email, token } = await request.json();
		
		if (!email || !token) {
			return json({ error: 'Email and token are required' }, { status: 400 });
		}

		// Use Supabase's verifyOtp to validate the reset token
		const { data, error } = await supabase.auth.verifyOtp({
			email: decodeURIComponent(email),
			token,
			type: 'recovery'
		});

		if (error) {
			console.log('Token verification error:', error);
			return json({ error: 'Invalid or expired token' }, { status: 400 });
		}

		if (!data.session) {
			return json({ error: 'Failed to create session' }, { status: 400 });
		}

		return json({ success: true });
	} catch (error) {
		console.error('POST callback error:', error);
		return json({ error: 'Server error' }, { status: 500 });
	}
};