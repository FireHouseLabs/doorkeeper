import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';
import { authenticate, getToken } from '$lib/services/inceptionAuthService';
import type { PageServerLoad } from '../$types';
import { PRIVATE_INCEPTION_BASE_URL } from '$env/static/private';
import { supabase } from '$lib/supabaseClient';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/login');
	}
	return {};
}) satisfies PageServerLoad;

const baseUrl = PRIVATE_INCEPTION_BASE_URL

async function controlDoor(id: string, token: string) {
    const url = `${baseUrl}/api/v1/control/door/${id}/activity`;
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
      // console.log('Door control response:', data);
      return data;
    } catch (error) {
      console.error('Error in controlDoor:', error);
      throw error;
    }
  }
  
  export const actions: Actions = {
    control: async ({ request, locals: { getSession } }: RequestEvent) => {
      const session = await getSession();
      if (!session) {
        throw redirect(302, '/login');
      }
  
      const formData = await request.formData();
      const doorId = formData.get('doorId') as string;
      const doorName = formData.get('doorName') as string; // Ensure the door name is also sent
  
      let token = getToken();
      if (!token) {
        token = await authenticate();
      }
  
      if (token) {
        try {
          const result = await controlDoor(doorId, token);
  
          // Insert a record into the Supabase entry_logs table
          const { error } = await supabase
            .from('entry_logs')
            .insert({
              user: session.user.id,
              user_email: session.user.email,
              door_name: doorName,
              door_id: doorId,
              status: true // Mark as successful
            });
  
          if (error) {
            console.error('Error inserting entry log:', error);
            return { success: false, error: 'Failed to log entry' };
          }
  
          return { success: true, result };
        } catch (error) {
          console.error('Failed to execute control action:', error);
  
          // Insert a record into the Supabase entry_logs table with status false
          const { error: logError } = await supabase
            .from('entry_logs')
            .insert({
              user: session.user.id,
              user_email: session.user.email,
              door_name: doorName,
              door_id: doorId,
              status: false // Mark as unsuccessful
            });
  
          if (logError) {
            console.error('Error logging failed entry attempt:', logError);
          }
  
          return { success: false, error: (error as Error).message };
        }
      } else {
        return { success: false, error: 'Failed to obtain authentication token' };
      }
    }
  };