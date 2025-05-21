import { trpcClient } from "@/lib/trpc-client";
import { useEffect, useState } from "react";

export function Example(props: { header: string }) {
	const [data, setData] = useState<{ id: string; name: string }[]>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await trpcClient.userList.query();

			setData(response);
		};
		fetchData();
	}, []);

	return (
		<>
			<div>{props.header}</div>
			{data?.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</>
	);
}
