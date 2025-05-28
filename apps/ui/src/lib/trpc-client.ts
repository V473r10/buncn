import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "api/src/routers/_app";

export const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:3000/trpc",
		}),
	],
});
