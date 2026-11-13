# DoorKeeper Improvement Tasks

This document outlines identified improvements for the DoorKeeper SvelteKit application, prioritized by impact on session handling issues and code quality.

## High Priority (Session & Authentication Issues)

### Task 1: Fix Session Handling - Remove Manual Cookie Management
**Status:** Pending  
**Priority:** Critical  
**File:** `src/routes/api/auth/callback/+server.ts:58`

**Issue:** Manual cookie setting conflicts with Supabase's built-in session management, likely causing session handling problems.

**Current Code:**
```typescript
'set-cookie': `session=${session.access_token}; HttpOnly; Path=/; SameSite=Lax`,
```

**Action Required:**
- Remove manual cookie management from POST handler
- Let Supabase SSR package handle session cookies automatically
- Ensure proper redirect handling without manual session setting

**Context:** The app uses `@supabase/ssr` which should handle cookie management. Manual intervention disrupts this flow.

---

### Task 2: Add Proper Error Handling to Password Reset
**Status:** Pending  
**Priority:** High  
**File:** `src/routes/(auth)/reset-password/+page.server.ts:9-11`

**Issue:** No error handling for failed password reset requests.

**Current Code:**
```typescript
await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${url.origin}/update-password`
});
```

**Action Required:**
- Add try-catch block around supabase call
- Return appropriate error messages to user
- Handle invalid email addresses
- Add form validation

**Context:** Users may enter invalid emails or encounter network issues, but currently receive no feedback.

---

### Task 3: Add Password Validation to Update Password Route
**Status:** Pending  
**Priority:** High  
**File:** `src/routes/(auth)/update-password/+page.server.ts:19-20`

**Issue:** No password validation (length, complexity, confirmation match).

**Current Code:**
```typescript
if (password && confirm && password == confirm) {
    await supabase.auth.updateUser({ password });
```

**Action Required:**
- Add password strength validation
- Improve password confirmation logic
- Add error handling for updateUser call
- Return validation errors to form

**Context:** Weak passwords can compromise security, and failed updates leave users confused.

---

## Medium Priority (Code Cleanup)

### Task 4: Clean Up Debug Console Logs
**Status:** Pending  
**Priority:** Medium  
**Files:** Multiple files (50+ instances found)

**Issue:** Production code contains extensive debug logging that should be removed or replaced with proper logging.

**Key Files:**
- `src/routes/api/auth/callback/+server.ts:37-66` (6 debug logs)
- `src/routes/+layout.svelte:29` (session logging)
- `src/routes/control/+page.svelte:56,72,83` (door control logs)
- `src/lib/services/inceptionAuthService.ts:8,23,31`

**Action Required:**
- Remove or replace console.log statements with proper logging
- Keep console.error for actual error handling
- Consider environment-based logging solution

**Context:** Console logs can expose sensitive information and impact performance in production.

---

### Task 5: Remove Commented Code Blocks
**Status:** Pending  
**Priority:** Medium  
**File:** `src/routes/api/auth/callback/+server.ts:1-20`

**Issue:** Large blocks of commented-out OTP verification code create confusion.

**Current Code:**
```typescript
// import { redirect } from '@sveltejs/kit';
// //import type { EmailOtpType } from '@supabase/supabase-js';
// 
// export const GET = async ({ url, locals: { supabase } }) => {
//   // ... 20 lines of commented code
```

**Action Required:**
- Remove commented code blocks entirely
- Clean up implementation to focus on current functionality
- Document any needed OTP logic for future reference

**Context:** Dead code makes maintenance harder and suggests incomplete implementation.

---

### Task 6: Simplify Browser Client Creation Logic
**Status:** Pending  
**Priority:** Medium  
**File:** `src/routes/+layout.ts:17-55`

**Issue:** Complex browser client creation logic may cause hydration issues and session problems.

**Current Code:** Complex conditional logic for browser vs server client creation with profile fetching.

**Action Required:**
- Simplify client creation logic
- Ensure consistent behavior between server and client
- Review profile fetching approach for efficiency
- Consider moving profile data to server load function

**Context:** SSR hydration mismatches can cause session inconsistencies and user experience issues.

---

## Feature Enhancement (Email OTP Workflow)

### Task 7: Create Email OTP Login Route
**Status:** Pending  
**Priority:** Medium  
**File:** New file needed: `src/routes/(auth)/otp-login/+page.server.ts`

**Issue:** Users want email OTP as alternative to password reset for forgotten passwords.

**Action Required:**
- Create new OTP login route with send/verify actions
- Implement `signInWithOtp()` for sending codes
- Implement `verifyOtp()` for code validation
- Create corresponding Svelte page with form

**Context:** Email OTP provides better UX for users who forget passwords frequently.

**Implementation Guide:**
```typescript
// Actions needed:
// 1. send: uses supabase.auth.signInWithOtp({ email })
// 2. verify: uses supabase.auth.verifyOtp({ email, token, type: 'email' })
```

---

### Task 8: Update Supabase Email Template for OTP
**Status:** Pending  
**Priority:** Medium  
**Location:** Supabase Dashboard > Authentication > Email Templates

**Issue:** Current email templates use magic links, need OTP template variant.

**Action Required:**
- Access Supabase dashboard
- Modify email template to include `{{ .Token }}` instead of `{{ .ConfirmationURL }}`
- Test OTP delivery
- Configure OTP expiration settings (default 1 hour)

**Context:** Supabase supports both magic links and OTP codes, but requires template modification.

---

## Low Priority (Polish & Maintenance)

### Task 9: Add Centralized Error Handling
**Status:** Pending  
**Priority:** Low  
**Files:** Multiple auth-related files

**Issue:** Inconsistent error handling across authentication flows.

**Action Required:**
- Create centralized auth error handler
- Standardize error messages and user feedback
- Implement consistent error boundaries
- Add proper error logging

**Context:** Better error handling improves user experience and debugging.

---

### Task 10: Remove Unused Signup Routes from Navbar
**Status:** Pending  
**Priority:** Low  
**File:** `src/lib/components/Navbar.svelte:58,61`

**Issue:** Commented-out signup links suggest incomplete feature removal.

**Current Code:**
```html
<!-- <li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li> -->
<!-- <li><a class="text-xs font-light uppercase" href="/profile">Profile</a></li> -->
```

**Action Required:**
- Remove commented HTML entirely
- Ensure signup functionality is properly disabled if not needed
- Clean up related route files if unused

**Context:** Clean navigation improves user experience and reduces confusion.

---

## Testing Notes

After completing each task:
1. Run `npm run check` for TypeScript validation
2. Run `npm run lint` for code quality
3. Test authentication flows manually
4. Verify session persistence across browser refresh
5. Check error handling with invalid inputs

## Development Order Recommendation

1. **Start with Task 1** (session handling) - this likely fixes your main issues
2. **Complete Tasks 2-3** (error handling/validation) - improves reliability  
3. **Tasks 4-6** (cleanup) - before adding new features
4. **Tasks 7-8** (OTP feature) - new functionality
5. **Tasks 9-10** (polish) - final improvements