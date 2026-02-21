<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	import type { ActionData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let form: ActionData;

	// Login method toggle
	let loginMethod: 'password' | 'otp' = 'otp';
	let isSubmitting = false;

	// Check URL parameters on mount to restore state
	onMount(() => {
		const urlParams = $page.url.searchParams;
		if (urlParams.get('method') === 'otp') {
			loginMethod = 'otp';
		}
	});

	// Form errors for different methods
	let passwordErrors: { error?: string; values?: { email?: string } } = {};
	let otpErrors: { error?: string; values?: { email?: string } } = {};

	function handlePasswordLogin({ result }: any) {
		isSubmitting = false;
		if (result.type === 'failure') {
			passwordErrors = result.data.signinWithPassword ?? {};
		} else {
			window.location.href = '/control';
		}
	}

	function handleOtpSend({ result }: any) {
		isSubmitting = false;
		if (result.type === 'failure') {
			otpErrors = result.data.sendOtp ?? {};
		} else if (result.type === 'redirect') {
			// Handle server redirect manually
			window.location.href = result.location;
		}
	}

	// Initialize form errors from server-side validation
	$: if (form) {
		console.log('Form data received:', form); // Debug log
		if (form.signinWithPassword) {
			passwordErrors = form.signinWithPassword;
		} else if (form.sendOtp) {
			otpErrors = form.sendOtp;
		}
	}

	function switchLoginMethod(method: 'password' | 'otp') {
		loginMethod = method;
		passwordErrors = {};
		otpErrors = {};
		// Update URL to maintain state
		if (method === 'otp') {
			goto('/login?method=otp', { replaceState: true });
		} else {
			goto('/login', { replaceState: true });
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<!-- Login Method Toggle -->
	<div class="mb-6 w-full lg:w-1/4">
		<div class="flex rounded-lg bg-gray-100 p-1">
			<button
				type="button"
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {loginMethod ===
				'password'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-500 hover:text-gray-900'}"
				on:click={() => switchLoginMethod('password')}
			>
				Password Login
			</button>
			<button
				type="button"
				class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors {loginMethod ===
				'otp'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-500 hover:text-gray-900'}"
				on:click={() => switchLoginMethod('otp')}
			>
				Magic Link
			</button>
		</div>
	</div>

	{#if loginMethod === 'password'}
		<!-- Password Login Form -->
		<form
			use:enhance={() => {
				isSubmitting = true;
				return async ({ result }) => handlePasswordLogin({ result });
			}}
			class="flex w-full flex-col gap-4 lg:w-1/4"
			action="?/login"
			method="POST"
		>
			{#if passwordErrors.error}
				<div class="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
					{passwordErrors.error}
				</div>
			{/if}

			<div>
				<label class="flex flex-col gap-2 text-xs" for="email">
					<span>Email</span>
					<input
						class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none"
						type="email"
						name="email"
						autocomplete="email"
						required
						value={passwordErrors.values?.email ?? ''}
					/>
				</label>
			</div>

			<PasswordInput />

			<button
				type="submit"
				disabled={isSubmitting}
				class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400 disabled:opacity-50"
			>
				<div class="absolute flex w-full flex-col items-center">
					{#if isSubmitting}
						<BarsRotateIcon size={16} />
					{:else}
						Login with Password
					{/if}
				</div>
			</button>

			<div class="flex flex-row items-center justify-center">
				<a
					class="text-center text-xs font-semibold tracking-tight text-green-600 hover:underline"
					aria-label="forgot password"
					href="reset-password">Forgot Password?</a
				>
			</div>
		</form>
	{:else}
		<!-- Email Entry for OTP -->
		<form class="flex w-full flex-col gap-4 lg:w-1/4" action="?/sendOtp" method="POST">
			{#if otpErrors.error}
				<div class="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
					{otpErrors.error}
				</div>
			{/if}

			<div class="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">
				<p class="mb-1 font-medium">Magic Link Login</p>
				<p class="text-xs">Enter your email address and we'll send you a login code.</p>
			</div>

			<div>
				<label class="flex flex-col gap-2 text-xs" for="email">
					<span>Email</span>
					<input
						class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none"
						type="email"
						name="email"
						autocomplete="email"
						required
						value={otpErrors.values?.email ?? ''}
					/>
				</label>
			</div>

			<button
				type="submit"
				class="btn relative bg-blue-600 px-4 py-2 text-xs uppercase text-white active:bg-blue-400"
			>
				<div class="absolute flex w-full flex-col items-center">Send Login Code</div>
			</button>
		</form>
	{/if}
</div>
