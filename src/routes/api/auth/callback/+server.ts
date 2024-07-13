import { redirect } from '@sveltejs/kit';
//import type { EmailOtpType } from '@supabase/supabase-js';

export const GET = async ({ url, locals: { supabase } }) => {
	//const token_hash = url.searchParams.get('token_hash') as string;
	const token_hash = url.searchParams.get('token') as string;
	const email = url.searchParams.get('email') as string;
	//const type: EmailOtpType = url.searchParams.get('type') as EmailOtpType;
	const next = url.searchParams.get('next') ?? '/update-password';

	if (token_hash && email) {
		const { error } = await supabase.auth.verifyOtp({ email: email, token: token_hash, type: 'signup' });
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`);
		}
	}

	// return the user to an error page with some instructions
	throw redirect(303, '/auth-code-error');
};
