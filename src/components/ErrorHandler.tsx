"use client";

import Error from "./Error";
import { useChatContext } from "@/context/chatContext";

export default function ErrorHandler() {
	const { errors } = useChatContext();
	return (
		<div className="error_block">
			{errors.map((error, index) => {
				return <Error {...error} key={index} />;
			})}
		</div>
	);
}
