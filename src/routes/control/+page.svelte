<script lang="ts">
	import { deserialize } from '$app/forms';
	import { onMount } from 'svelte';
	import { DoorOpen, Warehouse } from 'lucide-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import { writable } from 'svelte/store';
	import { DOOR_GUIDS } from '$lib/common/constants';
	import {
		MAX_LOCATION_ACCURACY_METRES,
		SITE_MAX_DISTANCE_METRES,
		calculateDistance
	} from '$lib/common/geo';
	import { getUserLocation, type UserPosition } from '$lib/services/locationService';
	import { PUBLIC_SITE_LATITUDE, PUBLIC_SITE_LONGITUDE } from '$env/static/public';
	import Notification from '$lib/components/Notification.svelte';

	let isLocationValid = false;
	let userLocation: UserPosition | null = null; // To store user's current location
	let userLocationError = ''; // To store error message

	// Success Location
	const targetLocation = {
		latitude: Number(PUBLIC_SITE_LATITUDE), // Set in environment variable for now so location is always secret
		longitude: Number(PUBLIC_SITE_LONGITUDE) // Set in environment variable for now so location is always secret
	};

	onMount(async () => {
		try {
			userLocation = await getUserLocation();
			if (!userLocation) {
				userLocationError = 'Could not determine your location.';
				return;
			}

			const distance = calculateDistance(
				userLocation.latitude,
				userLocation.longitude,
				targetLocation.latitude,
				targetLocation.longitude
			);

			isLocationValid =
				distance <= SITE_MAX_DISTANCE_METRES &&
				userLocation.accuracy <= MAX_LOCATION_ACCURACY_METRES;

			if (!isLocationValid) {
				userLocationError =
					userLocation.accuracy > MAX_LOCATION_ACCURACY_METRES
						? 'Your location is not accurate enough to confirm you are at the station.'
						: 'You are not within range of Moorooduc Fire Station.';
			}
		} catch (error) {
			console.error('Error checking location proximity:', error);
			userLocationError = 'Could not determine your location.';
		}
	});

	const doors = [
		{ id: DOOR_GUIDS.BA_FILLING_ROOM, name: 'BA Filling Room', icon: DoorOpen },
		{ id: DOOR_GUIDS.PPC_ROLLER_DOOR, name: 'PPC Roller Door', icon: Warehouse },
		{ id: DOOR_GUIDS.MEETING_ROOM_DOOR, name: 'Meeting Room', icon: DoorOpen }
	];

	export let data;
	export let form;

	const selectedDoorId = writable<string | null>(null);

	async function handleSubmit(event: Event, doorId: string, doorName: string) {
		event.preventDefault();

		// Send a current fix with the request. The server repeats this check and is the only thing
		// that actually gates the door — the branch below is UX.
		const position = await getUserLocation(30000);
		if (!position) {
			toast.push('Could not confirm your location. Allow location access and try again.', {
				duration: 5000,
				classes: ['error']
			});
			return;
		}

		userLocation = position;

		const formData = new FormData();
		formData.append('doorId', doorId);
		formData.append('doorName', doorName); // Include the door name
		formData.append('latitude', String(position.latitude));
		formData.append('longitude', String(position.longitude));
		formData.append('accuracy', String(position.accuracy));

		try {
			const response = await fetch('?/control', {
				method: 'POST',
				body: formData
			});

			const result = deserialize<{ result?: unknown }, { error?: string }>(await response.text());

			if (result.type === 'success') {
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
				return;
			}

			const message =
				(result.type === 'failure' ? result.data?.error : undefined) ??
				(result.type === 'error' ? result.error.message : undefined) ??
				'Failed to control the door.';

			console.error('Failed to control the door:', response.status, message);
			toast.push(message, {
				duration: 5000,
				classes: ['error']
			});
		} catch (error: any) {
			console.error('Error controlling door:', error);
			toast.push(`Error: ${error.message}`, {
				duration: 5000,
				classes: ['error']
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
                {id === $selectedDoorId ? 'bg-green-500' : ''}
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
	{#if form?.success}
		<p>Door opened successfully!</p>
	{/if}
	{#if form?.error}
		<p>{form.error}</p>
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
