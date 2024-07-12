// locationService.ts

interface Coordinates {
    latitude: number;
    longitude: number;
}

async function getUserLocation(): Promise<Coordinates | null> {
    return new Promise((resolve) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    resolve(null); // Handle error gracefully
                }
            );
        } else {
            console.error('Geolocation is not supported.');
            resolve(null); // Handle unsupported case
        }
    });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // in meters
    return distance;
}

async function checkLocationProximity(targetCoordinates: Coordinates, maxDistance: number): Promise<boolean> {
    const userLocation = await getUserLocation();
    if (!userLocation) {
        return false; // Handle case where user location is not available
    }

    const { latitude: userLat, longitude: userLon } = userLocation;
    const { latitude: targetLat, longitude: targetLon } = targetCoordinates;

    const distance = calculateDistance(userLat, userLon, targetLat, targetLon);

    return distance <= maxDistance;
}

export { getUserLocation, checkLocationProximity };
