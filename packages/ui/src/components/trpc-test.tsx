import { trpcClient } from "@/lib/trpc-client";
import { useEffect, useState } from "react";

export function Example(props: { header: string }) {
	const [users, setUsers] = useState<{ id: string; name: string }[]>();

	useEffect(() => {
		trpcClient.userList.query().then((res) => setUsers(res));
	}, []);

	return (
		<>
			<div>{props.header}</div>
			{users?.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</>
	);
}
