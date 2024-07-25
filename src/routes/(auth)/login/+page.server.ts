import { fail, type ActionFailure } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const result = await getEmailandPassword(request);
		if (isTypeAuthRequestData(result)) {
			const { email, password } = result;
			try {
				const { data, error } = await supabase.auth.signInWithPassword({ email, password });
				if (error) {
					throw error;
				}
				return {
					status: 200,
					data,
				};
			} catch (error) {
				if (error instanceof AuthApiError && error.status === 400) {
					return fail(400, {
						signinWithPassword: {
							error: 'Invalid credentials. If you have forgotten your password, please reset it.',
							values: {
								email
							}
						}
					});
				}
				return fail(500, {
					signinWithPassword: {
						error: 'Server error. You may be offline, check your connection or try again later.',
						values: {
							email
						}
					}
				});
			}
		}
	}
} satisfies Actions;

type AuthRequestData = {
	email: string;
	password: string;
};

async function getEmailandPassword(
	request: Request
): Promise<ActionFailure<{ error: string }> | AuthRequestData> {
	const data = await request.formData();
	const email = data.get('email') as string;
	const password = data.get('password') as string;
	if (!email) {
		return fail(400, {
			error: 'Please enter your email'
		});
	}
	if (!password) {
		return fail(400, {
			error: 'Please enter a password',
			values: {
				email
			}
		});
	}
	return { email, password };
}

function isTypeAuthRequestData<T>(data: T): data is T & AuthRequestData {
	return (
		typeof data == 'object' &&
		data != null &&
		'email' in data &&
		'password' in data &&
		typeof data.email == 'string' &&
		typeof data.password == 'string'
	);
}
