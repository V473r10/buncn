import BetterAuth from "./icons/better-auth";
import DrizzleORM from "./icons/drizzle";
import TanStack from "./icons/tanstack";
import TRPC from "./icons/trpc";
import Biomejs from "./icons/biome";
import ReactRouter from "./icons/react-router";
import Polar from "./icons/polar";
import Hono from "./icons/hono";

export const Stack = () => {
	return (
		<ul className={style.ul}>
			<li className={style.li}>
				<ReactRouter />
				{/* <span className={style.span}>React Router</span> */}
			</li>
			<li className={style.li}>
				<BetterAuth />
				{/* <span className={style.span}>Better Auth</span> */}
			</li>
			<li className={style.li}>
				<DrizzleORM />
				{/* <span className={style.span}>Drizzle ORM</span> */}
			</li>
			<li className={style.li}>
				<TanStack />
				{/* <span className={style.span}>TanStack Query</span> */}
			</li>
			<li className={style.li}>
				<TRPC />
				{/* <span className={style.span}>TRPC</span> */}
			</li>
			<li className={style.li}>
				<Biomejs />
				{/* <span className={style.span}>Biome</span> */}
			</li>
			<li className={style.li}>
				<Hono />
				{/* <span className={style.span}>Hono</span> */}
			</li>
			<li className={style.li}>
				<Polar />
				{/* <span className={style.span}>Polar</span> */}
			</li>
		</ul>
	);
};

const style = {
	ul: "flex flex-wrap justify-center gap-6 text-6xl",
	li: "flex flex-col items-center gap-2",
	span: "text-xl",
};
