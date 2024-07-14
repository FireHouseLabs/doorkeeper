<!-- src/routes/otp/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    let email = '';
    let token = '';
  
    onMount(() => {
      // Get the email and token from URL parameters
      const params = new URLSearchParams(window.location.search);
      email = params.get('email');
      token = params.get('token');
    });
  
    const handleSubmit = async () => {
        
      const response = await fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: encodeURIComponent(email), token })
      });
  
      if (response.ok) {
        // Redirect to the next page or show a success message
        window.location.href = '/update-password';
      } else {
        // Handle error
        console.error('Failed to validate OTP');
      }
    };
  </script>
  
  <main class="flex h-full w-full flex-col items-center justify-start p-4">
    <h1 class="text-lg font-semibold">Verify Signup</h1>
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex w-full flex-col gap-4 lg:w-1/4"
    >
      <div>
        <label class="flex flex-col gap-2 text-xs" for="token">
          <span>Verification Token</span>
          <input
            class="rounded bg-zinc-100 px-2 py-4 text-sm text-black focus:outline-none"
            type="text"
            id="token"
            bind:value={token}
            required
            readonly
          />
        </label>
      </div>
      <button
        type="submit"
        class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
      >
        Validate
      </button>
    </form>
  </main>
  