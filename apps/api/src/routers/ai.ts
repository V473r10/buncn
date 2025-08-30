import { bedrock, generateText } from "@buncn/ai";
import { Hono } from "hono";

export const aiRouter = new Hono();

aiRouter.get("/greet", (c) => {
	const model = bedrock("amazon.nova-micro-v1:0");

	const sayHello = async () => {
		const { text } = await generateText({
			model,
			prompt: "Hello, how are you?",
		});
		console.log(text);

		return text;
	};

	return c.json({ message: sayHello() });
});
