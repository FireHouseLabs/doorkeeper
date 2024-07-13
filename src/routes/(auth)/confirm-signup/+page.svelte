<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let otp = '';
	let error = '';

	async function confirmSignup(event: Event) {
		event.preventDefault();

		try {
			const { data, error: authError } = await supabase.auth.verifyOtp({
				email,
				token: otp,
				type: 'signup' // Ensure to specify the correct type
			});

			if (authError) {
				console.error('Error confirming OTP:', authError.message);
				error = authError.message;
				return;
			}

			if (data) {
				// Store the session in sessionStorage
				sessionStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
				console.log('Session token stored:', data.session);

				// Redirect using client-side navigation
				window.location.href = '/update-password';
				console.log('Navigating to update-password page...');
			}
		} catch (error) {
			console.error('Unexpected error during OTP validation:', error);
			// Handle unexpected errors, if any
		}
	}
</script>

<svelte:head>
	<title>Confirm Signup</title>
</svelte:head>

<h1>Confirm Signup</h1>
<form on:submit={confirmSignup}>
	<label for="email">Email:</label>
	<input type="email" id="email" bind:value={email} required />

	<label for="otp">OTP:</label>
	<input type="text" id="otp" bind:value={otp} required />

	<button type="submit">Submit</button>
</form>

{#if error}
	<p style="color: red;">{error}</p>
{/if}
