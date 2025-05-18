import { cn } from "@/lib/utils";
import { Outlet } from "react-router";

interface AuthLayoutProps {
	className?: string;
}

const AuthLayout = ({ className }: AuthLayoutProps) => {
	return (
		<div className="min-h-screen flex">
			{/* Sidebar */}
			<div className="hidden lg:flex w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between">
				<div>
					<h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
					<p className="text-primary-foreground/80">
						Streamline your workflow with our powerful platform.
					</p>
				</div>
				<div className="text-sm text-primary-foreground/60">
					© {new Date().getFullYear()} Your Company. All rights reserved.
				</div>
			</div>

			{/* Main Content */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className={cn("w-full max-w-md space-y-8", className)}>
					<div className="text-center lg:hidden mb-8">
						<h1 className="text-3xl font-bold">Your Logo</h1>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
