# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Project Setup
```bash
# Install dependencies
bun install

# Copy environment file and configure
cp apps/api/.env-example apps/api/.env

# Initialize database with Better Auth schema
bun run migrate

# Start development servers (both API and UI)
bun run dev
```

### Individual App Commands
```bash
# API development (runs on localhost:3000)
cd apps/api && bun run dev

# UI development (runs on localhost:5173)  
cd apps/ui && bun run dev

# Build all apps
bun run build

# Build individual apps
cd apps/api && bun run build
cd apps/ui && bun run build

# UI linting
cd apps/ui && bun run lint

# Create new projects
bun create buncn
```

### Documentation
```bash
# Run docs site (runs on localhost:3000)
cd docs && bun run dev

# Build docs
cd docs && bun run build
```

## Architecture Overview

**Buncn** is a modern Bun-based monorepo starter with the following structure:

### Monorepo Structure
- **apps/api/**: Hono-based REST API with OpenAPI documentation
- **apps/ui/**: React 19 + Vite frontend with TypeScript
- **docs/**: Next.js documentation site using Fumadocs
- **scripts/create-buncn/**: CLI tool for scaffolding new projects

### Technology Stack

**API (apps/api/):**
- **Runtime**: Bun
- **Framework**: Hono with OpenAPI support
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with 2FA support
- **Validation**: Zod schemas
- **Documentation**: Scalar API reference at `/api-reference`

**Frontend (apps/ui/):**
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Routing**: React Router v7
- **State Management**: TanStack Query for server state
- **Forms**: TanStack Form + React Hook Form
- **Internationalization**: i18next

**Database & Auth:**
- **Database**: PostgreSQL with Drizzle schema at `apps/api/src/db/`
- **Authentication**: Better Auth with email/password and 2FA
- **Auth Schema**: Auto-generated at `apps/api/src/db/auth.schema.ts`

### Key Configuration Files
- **Database**: `apps/api/drizzle.config.ts` for Drizzle configuration
- **Environment**: `apps/api/.env` (copy from `.env-example`)
- **API Docs**: OpenAPI specs available at `/openapi` endpoint
- **UI Config**: Vite config with path alias `@` → `./src`

### Development Workflow
1. The API serves on port 3000 with CORS enabled for localhost:5173
2. The UI connects to API and handles auth via Better Auth client
3. Database migrations are managed through `bun run migrate`
4. Both apps can be started simultaneously with `bun run dev` from root

### Authentication Flow
- Better Auth handles sessions, 2FA, and user management
- Protected routes use `<ProtectedRoute>` wrapper
- Public auth routes use `<PublicRoute>` wrapper  
- Auth state managed via TanStack Query

### UI Component Structure
- **Layouts**: `MainLayout` for protected routes, `AuthLayout` for auth pages
- **Components**: Shadcn/ui components in `components/ui/`
- **Apps**: Route-based app structure in `src/app/`
- **Hooks**: Custom hooks in `src/hooks/`
- **Utils**: Utilities and constants in `src/lib/`