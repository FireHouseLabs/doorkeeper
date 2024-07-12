<!-- components/Notification.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export const timeout = 50000; // Adjust timeout as needed, default to 5 seconds

  const showNotification = writable(true);

  function closeNotification() {
    showNotification.set(false);
    localStorage.setItem('notificationDismissed', 'true');
  }

  onMount(() => {
    const dismissed = localStorage.getItem('notificationDismissed');
    if (dismissed === 'true') {
      showNotification.set(false);
    }
  });
</script>

{#if $showNotification}
  <div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 max-w-sm mx-auto bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg> -->
      <span class="text-gray-800">To add this app to your home screen on iPhone, tap the share button <svg fill="#000000" class="inline h-6 w-6" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M30.3 13.7L25 8.4l-5.3 5.3-1.4-1.4L25 5.6l6.7 6.7z"/><path d="M24 7h2v21h-2z"/><path d="M35 40H15c-1.7 0-3-1.3-3-3V19c0-1.7 1.3-3 3-3h7v2h-7c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h20c.6 0 1-.4 1-1V19c0-.6-.4-1-1-1h-7v-2h7c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3z"/></svg>
      and then 'Add to Home Screen' <svg class="inline h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7C12.4142 7 12.75 7.33579 12.75 7.75V11.25H16.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75H12.75V16.25C12.75 16.6642 12.4142 17 12 17C11.5858 17 11.25 16.6642 11.25 16.25V12.75H7.75C7.33579 12.75 7 12.4142 7 12C7 11.5858 7.33579 11.25 7.75 11.25H11.25V7.75C11.25 7.33579 11.5858 7 12 7Z" fill="#212121"/>
        <path d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H6.25Z" fill="#212121"/>
        </svg>
      </span>
    </div>
    <button class="text-gray-400 hover:text-gray-600" aria-label="Close notification" on:click={closeNotification}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M2.293 3.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
{/if}
