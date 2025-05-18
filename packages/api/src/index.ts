import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './lib/auth';

const app = new Hono().basePath("/api")

app.use("/*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
