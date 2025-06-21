import { Stack } from "./components/stack";
import { CTA } from "./components/cta";
import { Features } from "./components/features";
import { Footer } from "./components/footer";

export default function HomePage() {
	return (
		<>
			<main className="flex flex-1 flex-col justify-start text-center pt-12 gap-8">
				<h1 className="mb-4 text-6xl font-bold">
					A lightweight monorepo template
					<br />
					built on top of Bun & Shadcn/ui
				</h1>
				<CTA />
				<h2 className="mb-4 text-4xl font-bold">
					It comes with a seamlessly integrated stack:
				</h2>
				<Stack />
				<Features />
			</main>
			<Footer />
		</>
	);
}
