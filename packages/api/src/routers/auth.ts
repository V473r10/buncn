import z from "zod";
import { auth } from "../lib/auth";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
	viewBackupCodes: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async (opts) => {
			const { userId } = opts.input;
			const result = await auth.api.viewBackupCodes({ body: { userId } });

			console.log("🚀 ~ .query ~ result:", result);
			return result.backupCodes;
		}),
});
