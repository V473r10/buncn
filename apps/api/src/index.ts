import { zValidator } from "@hono/zod-validator";
import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { cors } from "hono/cors";
import { z } from "zod";
import { auth } from "./lib/auth";
import { aiRouter } from "./routers/ai";
import { authRouter } from "./routers/auth";

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

app.route("/auth", authRouter);

app.route("/ai", aiRouter);

const healthCheckResponse = z.string();

// Root route for health check
app.get(
	"/",
	describeRoute({
		description: "Root route for health check",
		responses: {
			200: {
				description: "Hello Hono!",
				content: {
					"text/plain": { schema: resolver(healthCheckResponse) },
				},
			},
		},
	}),
	(c) => {
		return c.text("Hello Hono!");
	},
);

// OpenAPI
app.use(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Buncn API",
				description: "Buncn API",
				version: "1.0.0",
			},
			servers: [
				{
					url: "http://localhost:3000",
					description: "Development server",
				},
			],
		},
	}),
);

// API Reference
app.use(
	"/api-reference",
	Scalar({
		_integration: "hono",
		url: "http://localhost:3000/openapi",
	}),
);

export default app;
