<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	// Get email from URL parameters
	const email = $page.url.searchParams.get('email') || '';

	let isSubmitting = false;
	let otpErrors: { error?: string; values?: { email?: string; token?: string } } = {};

	function handleSubmit({ result }: any) {
		isSubmitting = false;
		if (result.type === 'failure') {
			otpErrors = result.data.verifyOtp ?? {};
		} else if (result.type === 'redirect') {
			window.location.href = result.location;
		}
	}

	// Initialize form errors from server-side validation
	$: if (form) {
		console.log('Form data received:', form);
		if (form.verifyOtp) {
			otpErrors = form.verifyOtp;
		}
	}

	function requestNewCode() {
		window.location.href = `/login?method=otp&email=${encodeURIComponent(email)}`;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<div class="w-full lg:w-1/3">
		<div class="mb-6 text-center">
			<h1 class="mb-2 text-2xl font-semibold text-gray-900">Enter Login Code</h1>
			<p class="text-sm text-gray-600">We sent a 6-digit code to your email</p>
		</div>

		<form
			use:enhance={() => {
				isSubmitting = true;
				return async ({ result }) => handleSubmit({ result });
			}}
			class="flex w-full flex-col gap-4"
			action="?/verifyOtp"
			method="POST"
		>
			<input type="hidden" name="email" value={email} />

			{#if otpErrors.error}
				<div class="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
					{otpErrors.error}
				</div>
			{/if}

			<div class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
				<p class="mb-1 font-medium">Check Your Email</p>
				<p class="text-xs">We sent a login code to <strong>{email}</strong></p>
			</div>

			<div>
				<label class="flex flex-col gap-2 text-xs" for="token">
					<span>Enter 6-digit code from email</span>
					<input
						class="rounded bg-zinc-100 px-4 py-4 text-center font-mono text-lg tracking-widest text-black focus:outline-none"
						type="text"
						name="token"
						placeholder="000000"
						maxlength="6"
						required
						autofocus
						autocomplete="one-time-code"
						inputmode="numeric"
						value={otpErrors.values?.token ?? ''}
					/>
				</label>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				class="btn relative rounded bg-green-600 px-4 py-4 text-sm font-medium uppercase text-white active:bg-green-400 disabled:opacity-50"
			>
				<div class="absolute flex w-full flex-col items-center">
					{#if isSubmitting}
						<BarsRotateIcon size={16} />
					{:else}
						Verify & Login
					{/if}
				</div>
			</button>

			<div class="mt-4 flex flex-row items-center justify-center gap-4">
				<button
					type="button"
					class="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
					on:click={requestNewCode}
				>
					Request New Code
				</button>
				<span class="text-gray-300">|</span>
				<a
					class="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
					href="/login"
				>
					Back to Login
				</a>
			</div>
		</form>
	</div>
</div>
