## Confirm Signup

<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>

## Invite User

<h2>You have been invited to DoorKeeper!</h2>

<h3>DoorKeeper is mobile based web application that allows you to control physical doors and spaces via your mobile device.</h3>

<p>You have been invited to DoorKeeper by: <strong>CFA Moorooduc</strong> to Access site: <strong>BA Filling Station.</strong></p>

<p>Go to this link and enter the token below to confirm your access: <a href="{{ .SiteURL }}/verify?email={{ .Email }}&token={{ .Token}}">{{ .SiteURL }}/verify?email={{ .Email }}&token={{ .Token}}</a></p>

<p>We recommend opening this link on your mobile device, from there you can set your password and save the app to your homescreen.</p>

<h2>How to use DoorKeeper</h2>

<h3>Setup Account</h3>
<p>1. Click the link provided above to launch DoorKeeper in your browser.</p>
<p>2. Your One Time Token will be pre-filled, click 'Validate'</p>
<p>3. If successful, you will be required to set a password on your account. This will enable you to login in the future.</p>
<p>4. After setting your password you will be direct to the Control interface, the setup is complete.</p>
<p>5. Ensure you grant permission to access location services when prompted by your device.</p>

<h3>Controlling Doors</h3>
<p>1. On the control interface, you will have a list of doors you have been granted access to.</p>
<p>2. To open a door, simply press the corresponding button and the door will release.</p>
<p><strong>Access to sites is geo-restricted to ensure users are within proximity of the site prior to attempting to open a door - ensure you have granted location services permissions when prompted so the app can locate you.</strong></p>

<h3>Save the App to Your Home Screen</h3>
<p>DoorKeeper is a web based app to ensure it can be used on a range of devices, but you can save the app to your device home screen so it looks and feels like a regular app.</p>
<p><strong>Android</strong></p>
<p>Android users will receive a prompt to install the app, tap install and follow the prompts on your device to add the app to your home screen.</p>
<p><strong>iPhone</strong></p>
<p>iOS does not recognise portable web apps. Users will be required to save to their home screen manually, iPhone users will receive an on-screen prompt with instructions to complete this step.</p>
<p>1. Tap the share icon below the address bar on Safari.</p>
<p>2. Tap 'Add to Home Screen' and follow the prompts.</p>

<p><strong>For additional support or questions please contact your relevant Group representative responsible for the BA Filling Station.</strong></p>

## Magic Link

<h2>Magic Link</h2>

<p>Follow this link to login:</p>
<p><a href="{{ .ConfirmationURL }}">Log In</a></p>

## Change Email Address

<h2>Confirm Change of Email</h2>

<p>Follow this link to confirm the update of your email from {{ .Email }} to {{ .NewEmail }}:</p>
<p><a href="{{ .ConfirmationURL }}">Change Email</a></p>

## Reset Password

<h2>Request to reset your DoorKeeper Password</h2>

<p>Password reset request for user: {{ .Email }}</p>

<p>Follow this link to reset your password: <a href="{{ .ConfirmationURL }}">Reset Password</a></p>

<h3>If you did not request a password reset, please ignore this email.</h3>

## Reauthentication

<h2>Confirm reauthentication</h2>

<p>Enter the code: {{ .Token }}</p>
