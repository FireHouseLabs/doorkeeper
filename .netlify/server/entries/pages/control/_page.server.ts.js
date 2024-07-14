import { r as redirect } from "../../../chunks/index.js";
import { s as supabase } from "../../../chunks/supabaseClient.js";
const PRIVATE_INCEPTION_USERNAME = "apiuser";
const PRIVATE_INCEPTION_PASSWORD = "CFA12345";
const PRIVATE_INCEPTION_BASE_URL = "https://skytunnel.com.au/inception/IN96031349";
let token = null;
let lastRequestTime = null;
async function authenticate() {
  console.log("Starting authentication process");
  const response = await fetch("https://skytunnel.com.au/inception/IN96031349/api/v1/authentication/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Username: PRIVATE_INCEPTION_USERNAME,
      Password: PRIVATE_INCEPTION_PASSWORD
    })
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to authenticate:", response.status, response.statusText, errorText);
    throw new Error("Failed to authenticate");
  }
  const data = await response.json();
  token = data.UserID;
  lastRequestTime = Date.now();
  return token;
}
function getToken() {
  if (token && lastRequestTime && Date.now() - lastRequestTime <= 10 * 60 * 1e3) {
    return token;
  }
  return null;
}
const load = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (!session) {
    redirect(302, "/login");
  }
  return {};
};
const baseUrl = PRIVATE_INCEPTION_BASE_URL;
async function controlDoor(id, token2) {
  const url = `${baseUrl}/api/v1/control/door/${id}/activity`;
  const body = {
    Type: "ControlDoor",
    DoorControlType: "Open",
    Entity: id
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `LoginSessId=${token2}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to control the door:", response.status, response.statusText, errorText);
      throw new Error(`Failed to control the door: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in controlDoor:", error);
    throw error;
  }
}
const actions = {
  control: async ({ request, locals: { getSession } }) => {
    const session = await getSession();
    if (!session) {
      throw redirect(302, "/login");
    }
    const formData = await request.formData();
    const doorId = formData.get("doorId");
    const doorName = formData.get("doorName");
    let token2 = getToken();
    if (!token2) {
      token2 = await authenticate();
    }
    if (token2) {
      try {
        const result = await controlDoor(doorId, token2);
        const { error } = await supabase.from("entry_logs").insert({
          user: session.user.id,
          user_email: session.user.email,
          door_name: doorName,
          door_id: doorId,
          status: true
          // Mark as successful
        });
        if (error) {
          console.error("Error inserting entry log:", error);
          return { success: false, error: "Failed to log entry" };
        }
        return { success: true, result };
      } catch (error) {
        console.error("Failed to execute control action:", error);
        const { error: logError } = await supabase.from("entry_logs").insert({
          user: session.user.id,
          user_email: session.user.email,
          door_name: doorName,
          door_id: doorId,
          status: false
          // Mark as unsuccessful
        });
        if (logError) {
          console.error("Error logging failed entry attempt:", logError);
        }
        return { success: false, error: error.message };
      }
    } else {
      return { success: false, error: "Failed to obtain authentication token" };
    }
  }
};
export {
  actions,
  load
};
