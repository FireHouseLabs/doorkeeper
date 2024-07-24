// import { redirect } from '@sveltejs/kit';
// //import type { EmailOtpType } from '@supabase/supabase-js';

// export const GET = async ({ url, locals: { supabase } }) => {
// 	//const token_hash = url.searchParams.get('token_hash') as string;
// 	const token_hash = url.searchParams.get('token') as string;
// 	const email = url.searchParams.get('email') as string;
// 	//const type: EmailOtpType = url.searchParams.get('type') as EmailOtpType;
// 	const next = url.searchParams.get('next') ?? '/update-password';

// 	if (token_hash && email) {
// 		const { error } = await supabase.auth.verifyOtp({ email: email, token: token_hash, type: 'signup' });
// 		if (!error) {
// 			throw redirect(303, `/${next.slice(1)}`);
// 		}
// 	}

// 	// return the user to an error page with some instructions
// 	throw redirect(303, '/auth-code-error');
// };
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  if (email && token) {
    return new Response(JSON.stringify({ email, token }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw redirect(303, '/auth-code-error');
  }
};

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