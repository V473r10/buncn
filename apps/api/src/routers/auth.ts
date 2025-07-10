import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { z } from "zod";
import { auth } from "../lib/auth";

export const authRouter = new Hono();

const BackupCodesResponseSchema = z.object({
	backupCodes: z.array(z.string()),
});

const route = authRouter.get(
	"/viewBackupCodes",
	describeRoute({
		tags: ["Auth"],
		description: "View backup codes for a user",
		parameters: [
			{
				name: "userId",
				in: "query",
				required: true,
				description: "User ID",
				schema: {
					type: "string",
				},
			},
		],
		responses: {
			200: {
				description: "Successful response",
				content: {
					"application/json": {
						schema: resolver(BackupCodesResponseSchema),
					},
				},
			},
		},
	}),
	zValidator(
		"query",
		z.object({
			userId: z.string(),
		}),
	),
	async (c) => {
		const { userId } = c.req.valid("query");
		const result = await auth.api.viewBackupCodes({ body: { userId } });
		return c.json({ backupCodes: result.backupCodes });
	},
);
