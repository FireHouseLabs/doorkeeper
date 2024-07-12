import { PRIVATE_INCEPTION_USERNAME, PRIVATE_INCEPTION_PASSWORD } from '$env/static/private';

//const API_ROOT = 'https://skytunnel.com.au/inception/IN96031349/api/v1';
let token: string | null = null;
let lastRequestTime: number | null = null;

async function authenticate() {
    console.log('Starting authentication process');

    const response = await fetch('https://skytunnel.com.au/inception/IN96031349/api/v1/authentication/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Username: PRIVATE_INCEPTION_USERNAME,
            Password: PRIVATE_INCEPTION_PASSWORD
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to authenticate:', response.status, response.statusText, errorText);
        throw new Error('Failed to authenticate');
    }

    const data = await response.json();
    token = data.UserID;
    lastRequestTime = Date.now();

    // console.log('Authentication successful, token received:', token);

    return token;
}

function getToken(): string | null {
    if (token && lastRequestTime && (Date.now() - lastRequestTime) <= 10 * 60 * 1000) {
        return token;
    }
    return null;
}

export { authenticate, getToken };