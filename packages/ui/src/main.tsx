import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./app/home/home.tsx";
import { MainLayout } from "./components/main-layout";
import "./index.css";
import AuthLayout from "./app/auth/auth-layout.tsx";
import SignIn from "./app/auth/sign-in/sign-in.tsx";
import SignUp from "./app/auth/sign-up/sign-up.tsx";
import TestRpc from "./app/test-rpc/test-rpc.tsx";
import UserSettings from "./app/user/user-settings.tsx";
import { ProtectedRoute } from "./components/protected-route";
import { PublicRoute } from "./components/public-route";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Home />} />
					<Route path="test-rpc" element={<TestRpc />} />
				</Route>
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}
				>
					<Route path="user" element={<UserSettings />} />
				</Route>
				<Route
					path="auth"
					element={
						<PublicRoute>
							<AuthLayout />
						</PublicRoute>
					}
				>
					<Route path="sign-in" element={<SignIn />} />
					<Route path="sign-up" element={<SignUp />} />
					<Route index element={<Navigate to="sign-in" replace />} />
				</Route>
				{/* Redirect any unknown routes to home */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
