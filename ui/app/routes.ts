import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home/home.tsx"), route("auth/sign-in", "routes/auth/sign-in/sign-in.tsx")] satisfies RouteConfig;
