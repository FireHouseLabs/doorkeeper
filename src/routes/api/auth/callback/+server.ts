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