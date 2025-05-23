import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins";
import * as schema from "../db/auth.schema";
import { db } from "../db/db";

export const auth = betterAuth({
	appName: "Buncn",
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [twoFactor()],
	trustedOrigins: ["http://localhost:5173"],
});
