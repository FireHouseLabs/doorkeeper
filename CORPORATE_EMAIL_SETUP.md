# Corporate Email Setup for OTP Login

## Problem
Corporate email security services like Mimecast scan email links and consume authentication tokens, making standard magic link flows unusable.

## Solution
Send numeric codes via email with safe links to manual entry pages.

## Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Create OTP codes table
CREATE TABLE IF NOT EXISTS otp_codes (
  email TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add RLS policies
i w

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_otp_codes_email_code ON otp_codes(email, code);
CREATE INDEX IF NOT EXISTS idx_otp_codes_expires_at ON otp_codes(expires_at);
```

## Email Template Configuration

In your Supabase Dashboard → Authentication → Email Templates → Magic Link:

### Subject Line:
```
Your DoorKeeper Login Code
```

### HTML Template:
```html
<h2>Your Login Code</h2>
<p>Hello,</p>
<p>Here's your 6-digit login code for DoorKeeper:</p>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
    <h1 style="font-family: monospace; font-size: 32px; letter-spacing: 8px; color: #333; margin: 0;">
        {{ .Token }}
    </h1>
</div>

<div style="text-align: center; margin: 30px 0;">
    <a href="{{ .SiteURL }}/verify-otp?email={{ .Email }}"
       style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
       Enter Code & Login
    </a>
</div>

<p><strong>Or manually:</strong></p>
<ol>
    <li>Go to: <a href="{{ .SiteURL }}/verify-otp?email={{ .Email }}">{{ .SiteURL }}/verify-otp</a></li>
    <li>Enter the 6-digit code above</li>
    <li>Click "Verify & Login"</li>
</ol>

<p><small>This code will expire in 10 minutes. If you didn't request this code, you can safely ignore this email.</small></p>

<hr>
<p><small>DoorKeeper - Secure Door Access Management</small></p>
```

## Why This Works

1. **No Consumable Links**: The email contains a regular link to the login page, not a magic link with tokens
2. **Manual Code Entry**: Users manually enter the 6-digit code, which can't be consumed by email scanners
3. **Corporate-Safe**: Mimecast can scan the email and click the link without breaking the authentication flow
4. **User-Friendly**: Clear instructions guide users through the process

## Implementation Notes

- The current code generates 6-digit numeric codes stored in a custom database table
- Codes expire after 10 minutes for security
- The system checks if users exist before sending codes
- All error messages are user-friendly and don't expose internal details
