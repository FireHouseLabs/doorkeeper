// locationService.ts

import type { Coordinates } from '$lib/common/geo';

export interface UserPosition extends Coordinates {
	/** Radius of confidence in metres, as reported by the device. */
	accuracy: number;
}

/**
 * Reads the device position. `maximumAge` lets a caller accept a recently cached fix (in ms)
 * instead of waiting for a fresh one — use 0 when the answer must be current.
 */
async function getUserLocation(maximumAge = 0): Promise<UserPosition | null> {
	return new Promise((resolve) => {
		if (!('geolocation' in navigator)) {
			console.error('Geolocation is not supported.');
			resolve(null); // Handle unsupported case
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				resolve({
					latitude: coords.latitude,
					longitude: coords.longitude,
					accuracy: coords.accuracy
				});
			},
			(error) => {
				console.error('Error getting user location:', error);
				resolve(null); // Handle error gracefully
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge }
		);
	});
}

export { getUserLocation };
