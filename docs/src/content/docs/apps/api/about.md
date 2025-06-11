---
title: About the API
description: An overview of the buncn API architecture and key technologies.
---

The API is a lightweight web server built with [Bun](https://bun.sh/), [Hono](https://hono.dev/), and [tRPC](https://trpc.io/).

## Key Technologies & Features

*   **Framework**: The API utilizes [tRPC](https://trpc.io/) for building type-safe APIs.
    *   **Initialization**: The tRPC instance is initialized in `apps/api/src/routers/trpc.ts`. This file exports a `router` factory (`t.router`) and a `publicProcedure` helper (`t.procedure`). 
    
        For the sample project, we merge a few example procedures with the auth router in `apps/api/src/routers/_app.ts
    
    *   **Type Safety**: This setup allows for easy integration with TypeScript-based frontends, providing end-to-end type safety.
    *   **Routers**: You can find details about the API routes and procedures in the [Routers](./routers.md) section.

*   **Database**: It uses a PostgreSQL database, with [Drizzle ORM](https://orm.drizzle.team/) for database interactions. The schema is designed to support user management and authentication features. More details can be found in the [Database Schema](./schema.md) section.

*   **Authentication**: Authentication is handled by the [`better-auth`](https://github.com/pilcrowonpaper/better-auth) library.
    *   **Adapter**: It uses the `drizzleAdapter` to integrate with the Drizzle ORM and the defined database schema.
    *   **Email & Password**: Standard email and password authentication is enabled.
    *   **Two-Factor Authentication**: The `twoFactor()` plugin is enabled, providing an extra layer of security.
    *   **Trusted Origins**: For development, `http://localhost:5173` is configured as a trusted origin.
    *   The `appName` for `better-auth` is configured as "Buncn".


## Server Setup & Request Handling

The API server is built using [Hono](https://hono.dev/), a lightweight and fast web framework for JavaScript.

*   **Entry Point**: The main server logic is defined in `apps/api/src/index.ts`.
*   **CORS**: Cross-Origin Resource Sharing (CORS) is configured to allow requests from `http://localhost:5173` (typically the frontend development server), including credentials.
*   **Authentication Endpoints**: Authentication-related requests (e.g., login, logout, registration) are handled by the `better-auth` library at the `/api/auth/**` path.
*   **tRPC Endpoints**:
    *   The tRPC router (`appRouter`) is served using the `@hono/trpc-server` adapter.
    *   To accommodate `React.StrictMode` behavior during development, tRPC requests are handled at both `/trpc/*` and `/api/trpc/*`. In a production environment, `/api/trpc/*` is the primary endpoint.
*   **Health Check**: A basic health check endpoint is available at the root path (`/`), which returns the text "Hello Hono!".

*   **Monorepo Structure**: As part of the `buncn` template, the API is designed to work seamlessly within a monorepo setup, facilitating code sharing and integrated development workflows.

This overview should provide a good starting point for understanding the API's architecture and how its components fit together.