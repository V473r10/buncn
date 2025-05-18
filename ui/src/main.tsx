import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./app/home/home.tsx";
import { MainLayout } from "./components/main-layout";
import "./index.css";
import AuthLayout from "./app/auth/auth-layout.tsx";
import SignIn from "./app/auth/sign-in/sign-in.tsx";
import SignUp from "./app/auth/sign-up/sign-up.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="auth" element={<AuthLayout />}>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
