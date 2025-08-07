# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DoorKeeper is a SvelteKit application that serves as a wrapper for the Inner Range SkyCommand API, providing a user-friendly replacement for the IR SkyCommand App for basic access control. The app uses Supabase for authentication with email-based auth using PKCE flow for SSR.

## Development Commands

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

# Linting and formatting
npm run lint
npm run format
```

## Architecture

### Authentication Flow
- Uses Supabase SSR with @supabase/ssr package
- Server-side authentication handled in `src/hooks.server.ts`
- Session management through SvelteKit locals
- Email confirmation flow with API endpoint at `/api/auth/callback`

### Route Structure
- `(auth)/*` - Authentication-related pages (login, signup, password reset, etc.)
- `(admin)/*` - Admin-only pages with entry logs, invite logs, and user invite functionality
- `control/` - Main access control interface
- `protected-routes/` - Example protected content area

### Key Components
- Authentication state managed through `src/routes/+layout.server.ts`
- Supabase client configuration in `src/lib/supabaseClient.ts`
- Server hooks handle cookie-based session management
- Type definitions extend SvelteKit's App namespace for Supabase integration

### Services
- `inceptionAuthService.ts` - Handles integration with Inner Range SkyCommand API
- `locationService.ts` - Location-based functionality

### Styling
- TailwindCSS with DaisyUI components
- PostCSS configuration for processing
- Custom icons in `src/lib/icons/`

## Environment Setup

Required environment variables:
```bash
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Types
- TypeScript definitions should be maintained in `src/DatabaseDefinitions.ts`
- Database types are exported through `src/app.d.ts`

## Deployment
- Configured for Netlify deployment via `@sveltejs/adapter-netlify`
- Build outputs to `build/` directory
- Static assets served from `static/`