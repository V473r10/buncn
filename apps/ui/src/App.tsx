import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import AuthLayout from "./app/auth/auth-layout.tsx";
import SignIn from "./app/auth/sign-in/sign-in.tsx";
import TwoFactor from "./app/auth/sign-in/two-factor/two-factor.tsx";
import SignUp from "./app/auth/sign-up/sign-up.tsx";
import Home from "./app/home/home.tsx";
import TestRpc from "./app/test-rpc/test-rpc.tsx";
import UserSettings from "./app/user/user-settings.tsx";
import { MainLayout } from "./components/main-layout.tsx";
import { ProtectedRoute } from "./components/protected-route.tsx";
import { PublicRoute } from "./components/public-route.tsx";
import { trpcClient } from "./lib/trpc-client.ts";
import { TRPCProvider } from "./lib/trpc.ts";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
		},
	});
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}

function App() {
	const queryClient = getQueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
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
								<Route path="sign-in/two-factor" element={<TwoFactor />} />
								<Route path="sign-up" element={<SignUp />} />
								<Route index element={<Navigate to="sign-in" replace />} />
							</Route>
							{/* Redirect any unknown routes to home */}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</BrowserRouter>
					<Toaster />
				</TRPCProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
