import { Heart } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="flex flex-col gap-2 items-center justify-center p-4">
			<p className="flex items-center gap-2">Buncn</p>
			<p className="flex items-center gap-2">
				Made with <Heart /> by{" "}
				<a
					href="https://github.com/v473r10"
					target="_blank"
					rel="noopener noreferrer"
				>
					Facundo Valerio
				</a>
			</p>
		</footer>
	);
};
