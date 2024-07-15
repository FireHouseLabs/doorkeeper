import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabaseClient.js";
import "../../../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let otp = "";
  return `${$$result.head += `<!-- HEAD_svelte-ub538w_START -->${$$result.title = `<title>Confirm Signup</title>`, ""}<!-- HEAD_svelte-ub538w_END -->`, ""} <h1 data-svelte-h="svelte-l9lv1s">Confirm Signup</h1> <form><label for="email" data-svelte-h="svelte-1flf0h4">Email:</label> <input type="email" id="email" required${add_attribute("value", email, 0)}> <label for="otp" data-svelte-h="svelte-akw66u">OTP:</label> <input type="text" id="otp" required${add_attribute("value", otp, 0)}> <button type="submit" data-svelte-h="svelte-1ou7dtz">Submit</button></form> ${``}`;
});
export {
  Page as default
};
