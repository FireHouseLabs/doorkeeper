<script lang="ts">
	import { DOOR_GUIDS } from '$lib/common/constants';
	import { onMount } from 'svelte';
	import { checkLocationProximity } from '$lib/services/locationService';
	import { DoorOpen, Warehouse } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { writable } from 'svelte/store';
	import { PUBLIC_SITE_LATITUDE, PUBLIC_SITE_LONGITUDE } from '$env/static/public';
	import { isiOS } from '$lib/utils/detectOS';
	import Notification from '$lib/components/Notification.svelte';

	let isLocationValid = false;
	let userLocation = null; // To store user's current location
	let userLocationError = ''; // To store error message

	// Success Location
	const targetLocation = {
		latitude: Number(PUBLIC_SITE_LATITUDE), // Set in environment variable for now so location is always secret
		longitude: Number(PUBLIC_SITE_LONGITUDE) // Set in environment variable for now so location is always secret
	};

	const maxDistance = 5000; // Maximum distance in meters

	onMount(async () => {
		try {
			isLocationValid = await checkLocationProximity(targetLocation, maxDistance);
		} catch (error) {
			console.error('Error checking location proximity:', error);
		}
	});

	const doors = [
		{ id: DOOR_GUIDS.BA_FILLING_ROOM, name: 'BA Filling Room', icon: DoorOpen },
		{ id: DOOR_GUIDS.PPC_ROLLER_DOOR, name: 'PPC Roller Door', icon: Warehouse },
		{ id: DOOR_GUIDS.MEETING_ROOM_DOOR, name: 'Meeting Room', icon: DoorOpen }
	];

	export let data;

	const selectedDoorId = writable<string | null>(null);

	async function handleSubmit(event: Event, doorId: string, doorName: string) {
		event.preventDefault();

		const formData = new FormData();
		formData.append('doorId', doorId);
		formData.append('doorName', doorName); // Include the door name

		try {
			const response = await fetch('?/control', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Door control result:', result);

				// Set selected door ID for UI feedback
				selectedDoorId.set(doorId);

				// Reset selected door ID after 5 seconds
				setTimeout(() => {
					selectedDoorId.set(null);
				}, 5000);

				toast.push('Door opened successfully!', {
					duration: 5000,
					classes: ['success']
				});
			} else {
				const errorText = await response.text();
				console.error(
					'Failed to control the door:',
					response.status,
					response.statusText,
					errorText
				);
				toast.error(`Failed to control the door: ${response.statusText}`, {
					duration: 5000
				});
			}
		} catch (error) {
			console.error('Error controlling door:', error);
			toast.error(`Error: ${error.message}`, {
				duration: 5000
			});
		}
	}
</script>

{#if isLocationValid}
	<div class="flex h-screen flex-col items-center px-8 py-8">
		<h1 class="mb-4 w-full text-center text-3xl font-bold">Moorooduc BA Filling Station</h1>
		<h2 class="mb-4 text-2xl font-bold">Available Doors</h2>
		<p class="mb-8 text-lg">Tap button to open door.</p>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each doors as { id, name, icon: Icon }}
				<button
					type="button"
					class="
                focus:shadow-outline rounded-lg bg-blue-500 px-6 py-9 font-bold text-white shadow-lg
                transition-colors duration-300 hover:bg-blue-700 focus:outline-none
                {id === selectedDoorId ? 'bg-green-500' : ''}
            "
					on:click={(event) => handleSubmit(event, id, name)}
				>
					<Icon class="mx-auto mb-2 h-8 w-8 text-white" />
					{name}
				</button>
			{/each}
		</div>
	</div>
	<Notification />
	{#if data?.success}
		<p>Door opened successfully!</p>
	{/if}
	{#if data?.error}
		<p>{data.error}</p>
	{/if}
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="mx-auto max-w-md rounded-lg border-2 border-red-600 bg-red-100 p-6 text-center">
			<h1 class="mb-2 text-3xl font-bold text-red-600">Access Denied</h1>
			<p class="mb-2 text-lg text-black">You are not within range of Moorooduc Fire Station.</p>

			{#if userLocationError}
				<div class="rounded-lg border-2 border-red-600 bg-red-200 p-4 text-red-800">
					<p>{userLocationError}</p>
					{#if userLocation}
						<p>
							User's last known location: Latitude {userLocation.latitude}, Longitude {userLocation.longitude}
						</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	<Notification />
{/if}
