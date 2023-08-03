import { useChatContext } from "@/context/chatContext";
import { ErrorType } from "@/utils/types/types";
import { IoClose } from "react-icons/io5";

type ErrorProps = ErrorType;

export default function Error(props: ErrorProps) {
	const { deleteError } = useChatContext();
	return (
		<span className="error_handler show">
			<p className="error_msg">{props.message}</p>
			<div
				className="close"
				onClick={() => {
					deleteError(props.id);
				}}
			>
				<IoClose size={20} />
			</div>
		</span>
	);
}
