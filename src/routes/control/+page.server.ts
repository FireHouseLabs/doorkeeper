import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import { authenticate, getToken } from '$lib/services/inceptionAuthService';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/login');
	}
	return {};
}) satisfies PageServerLoad;
  

async function controlDoor(id: string, token: string) {
    const url = `https://skytunnel.com.au/inception/IN96031349/api/v1/control/door/${id}/activity`;
    const body = {
      Type: 'ControlDoor',
      DoorControlType: 'Open',
      Entity: id
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `LoginSessId=${token}`
        },
        body: JSON.stringify(body)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to control the door:', response.status, response.statusText, errorText);
        throw new Error(`Failed to control the door: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Door control response:', data);
      return data;
    } catch (error) {
      console.error('Error in controlDoor:', error);
      throw error;
    }
  }
  
  export const actions: Actions = {
    control: async ({ request }: RequestEvent) => {
      const formData = await request.formData();
      const doorId = formData.get('doorId') as string;
  
      // Get token or authenticate
      let token = getToken();
      if (!token) {
        token = await authenticate();
      }
  
      // Ensure token is a string before passing it to controlDoor
      if (token) {
        try {
          const result = await controlDoor(doorId, token);
          return { success: true, result };
        } catch (error) {
          console.error('Failed to execute control action:', error);
          return { success: false, error: error.message };
        }
      } else {
        return { success: false, error: 'Failed to obtain authentication token' };
      }
    }
  };