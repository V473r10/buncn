import { LiquidButton } from "@/components/animate-ui/buttons/liquid";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
	return (
		<div className="my-4">
			<LiquidButton className="text-3xl font-bold px-6 py-8">
				<Link href="/docs/introduction" className="flex items-center">
					Get Started <ArrowRight className="ml-2 size-6" />
				</Link>
			</LiquidButton>
		</div>
	);
};
