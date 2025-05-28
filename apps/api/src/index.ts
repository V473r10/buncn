import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { appRouter } from "./routers/_app";

/**
 * This file configures our API routes.
 *
 * We have a special case with tRPC due to how React.StrictMode works:
 * 1. In development, React.StrictMode causes components to mount twice
 * 2. On the first mount, tRPC tries to make the request to /trpc
 * 3. On the second mount, tRPC tries to make the request to /api/trpc
 *
 * This happens because:
 * - The first request is made before the tRPC client is fully initialized
 * - The second request is made with the client already initialized and configured
 *
 * To handle this, we configure the server to respond on both routes:
 * - /trpc/* -> For the first request (development mode)
 * - /api/trpc/* -> For subsequent requests and production
 */

const app = new Hono();

// CORS configuration to allow requests from the frontend
app.use(
	"/*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

// Authentication routes - Always use the /api prefix
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

// tRPC configuration
const trpcMiddleware = trpcServer({
	router: appRouter,
});

// Mount the tRPC middleware on both routes to handle:
// 1. The first request at /trpc (React.StrictMode first mount)
// 2. Subsequent requests at /api/trpc (React.StrictMode second mount and production)
app.use("/trpc/*", trpcMiddleware);
app.use("/api/trpc/*", trpcMiddleware);

// Root route for health check
app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default app;
