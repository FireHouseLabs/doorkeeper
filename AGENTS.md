# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

## Project Overview

DoorKeeper is a SvelteKit application that serves as a wrapper for the Inner Range SkyCommand API, providing a user-friendly replacement for the IR SkyCommand App for basic access control. The app uses Supabase for authentication with email-based auth using PKCE flow for SSR.

## Build/Lint/Test Commands

```bash
# Development server (opens on port 5174)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Type checking with watch mode
npm run check:watch

# Linting (runs prettier check + eslint)
npm run lint

# Format code
npm run format
```

**Note:** No test framework is currently configured in this project.

## Code Style Guidelines

### Formatting (Prettier)

- **Tabs:** Use tabs for indentation (`useTabs: true`)
- **Quotes:** Single quotes for strings (`singleQuote: true`)
- **Trailing Commas:** No trailing commas (`trailingComma: 'none'`)
- **Print Width:** 100 characters max (`printWidth: 100`)
- **Plugins:** `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`

### Imports

Order imports as follows:

1. SvelteKit/app imports (`$app/forms`, `$app/navigation`, `$app/stores`, `$app/environment`)
2. External packages (`@supabase/...`, `lucide-svelte`, etc.)
3. Internal aliases (`$lib/...`, `$env/static/public`, `$env/static/private`)
4. Relative imports (`./$types`, `../...`)
5. Type imports should use `import type { ... }` syntax

```typescript
// Example import order
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { AuthApiError } from '@supabase/supabase-js';
import { failWithAuthError } from '$lib/utils/authErrorHandler';
```

### TypeScript

- **Strict mode:** Enabled (`strict: true` in tsconfig.json)
- **Type annotations:** Use explicit return types for functions, especially in load functions and actions
- **Satisfies keyword:** Use `satisfies` for type checking expressions

```typescript
export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/login');
	}
	return {};
}) satisfies PageServerLoad;
```

### SvelteKit Conventions

#### Server Load Functions

```typescript
export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	return { session };
}) satisfies PageServerLoad;
```

#### Actions

```typescript
export const actions = {
	actionName: async ({ request, locals: { supabase } }) => {
		// implementation
	}
} satisfies Actions;
```

#### Form Handling

Use `$app/forms` enhance for form submissions:

```svelte
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<form use:enhance method="POST" action="?/actionName">
	<!-- form content -->
</form>
```

### Naming Conventions

- **Files:** kebab-case for filenames (`authErrorHandler.ts`, `password-input.svelte`)
- **Components:** PascalCase for component files (`Navbar.svelte`, `PasswordInput.svelte`)
- **Functions:** camelCase (`getSession`, `handleAuthError`, `failWithAuthError`)
- **Constants:** SCREAMING_SNAKE_CASE for true constants (`DOOR_GUIDS`)
- **Types/Interfaces:** PascalCase (`AuthRequestData`, `AuthErrorResponse`)
- **Route groups:** Parentheses for route groups (`(auth)`, `(admin)`)

### Error Handling

Use centralized error handling for auth errors via `$lib/utils/authErrorHandler.ts`:

```typescript
import { failWithAuthError } from '$lib/utils/authErrorHandler';

// In actions
try {
	// operation
} catch (error) {
	return failWithAuthError(
		error,
		'actionName',
		'User-friendly default message',
		{ email } // preserve form values
	);
}
```

For validation errors, use `fail()` directly:

```typescript
if (!email) {
	return fail(400, {
		actionName: {
			error: 'Please enter your email address',
			values: { email }
		}
	});
}
```

### Svelte Components

```svelte
<script lang="ts">
	// 1. Imports
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';

	// 2. Props (use export let)
	export let form: ActionData;
	export let session: Session | null;

	// 3. Local state
	let isLoading = false;

	// 4. Reactive statements
	$: derivedValue = someValue;

	// 5. Functions
	function handleClick() {
		// ...
	}

	// 6. Lifecycle hooks
	onMount(() => {
		// ...
	});
</script>

<!-- Template -->
<div class="...">
	<!-- content -->
</div>
```

### Styling

- **Framework:** TailwindCSS with DaisyUI components
- **Classes:** Use Tailwind utility classes directly in templates
- **No CSS files:** Prefer inline Tailwind classes over separate CSS files

### Environment Variables

- **Public:** Prefix with `PUBLIC_` and access via `$env/static/public`
- **Private:** Access via `$env/static/private`

```typescript
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_INCEPTION_USERNAME } from '$env/static/private';
```

### Route Structure

```
src/routes/
├── (auth)/           # Auth-related pages (login, signup, etc.)
├── (admin)/          # Admin-only pages (entry-logs, invite, etc.)
├── control/          # Main access control interface
├── api/auth/callback/# Auth callback endpoint
└── +layout.svelte    # Root layout
```

### Key Patterns

1. **Session access:** Always use `locals.getSession()` on server, `data.session` in components
2. **Protected routes:** Check session in load function and redirect if missing
3. **Admin routes:** Query `profiles` table for `site_admin` flag
4. **Database types:** Maintain types in `src/DatabaseDefinitions.ts` (create if needed)

### Deployment

- **Adapter:** `@sveltejs/adapter-netlify`
- **Build output:** `build/` directory
- **Static assets:** `static/` directory
