import { Button } from "@/components/ui/button";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import Link from "next/link";

export const CTA = () => {
	return (
		<div className="my-4">
			<Button asChild className="text-3xl font-bold px-6 py-6">
				<Link href="/docs/introduction">
					Get Started <ArrowRight className="ml-2 size-6" />
				</Link>
			</Button>
		</div>
	);
};
