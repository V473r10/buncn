import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { appRouter } from "./routes/_app";

const app = new Hono().basePath("/api");

app.use(
	"/*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

export default app;
