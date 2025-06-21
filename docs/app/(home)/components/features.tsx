import { KeyRound, DatabaseZap, CreditCard, Globe } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "@/components/ui/card";
import BetterAuth from "./icons/better-auth";
import Hono from "./icons/hono";
import Polar from "./icons/polar";
import { Badge } from "@/components/ui/badge";

interface Feature {
	title: string;
	description: string;
	icon: React.ReactNode;
	span?: string; // additional tailwind classes for grid span
	soon?: boolean;
	link?: string;
}

const features: Feature[] = [
	{
		title: "Authentication",
		description: "Extensible authentication flows.",
		icon: <BetterAuth className="h-8 w-8" />,
		link: "/docs/auth",
	},
	{
		title: "API",
		description: "Reusable, extensible and type-safe REST-API for your app.",
		icon: <Hono className="h-8 w-8" />,
		link: "/docs/api",
	},
	{
		title: "Payments",
		description: "Charge your users with subscriptions.",
		icon: <Polar className="h-8 w-8" />,
		soon: true,
	},
	{
		title: "Emails",
		description: "Send emails to your users.",
		icon: <KeyRound className="h-8 w-8" />,
		soon: true,
	},
];

export const Features = () => {
	return (
		<section className="mx-auto max-w-6xl w-full px-4 md:px-8">
			<div className="grid gap-6 md:grid-cols-2 auto-rows-[1fr]">
				{features.map(({ title, description, icon, span, soon, link }) => (
					<Card
						key={title.replace(/\s+/g, "-").toLowerCase()}
						className={[
							"relative flex flex-col justify-between rounded-2xl border border-muted/40 bg-card/10 text-left p-6 md:p-8 shadow-sm transition-colors backdrop-blur-xs",
							span ?? "",
						].join(" ")}
					>
						<CardHeader className="flex items-start gap-4">
							{icon}
							<div>
								<CardTitle className="text-xl leading-tight sm:text-2xl">
									{title}
								</CardTitle>
								<CardDescription className="mt-2">
									{description}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<CardAction>
								{soon ? (
									<Badge variant="outline">Coming soon</Badge>
								) : (
									<a
										href={link}
										className="inline-flex items-center text-sm font-medium text-primary hover:underline"
									>
										Learn more →
									</a>
								)}
							</CardAction>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};
