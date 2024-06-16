import Link from "next/link";
import styles from "@/app/styles/chatscren.module.css";

function parseMessage(message: string) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const parts = message.split(urlRegex);

	return (
		<div className={styles.body}>
			{parts.map((part, index) =>
				urlRegex.test(part) ? (
					<Link
						key={index}
						href={part}
						target="_blank"
						rel="noopener noreferrer"
						className={styles.link}
					>
						{part}
					</Link>
				) : (
					<span key={index}>{part} </span>
				)
			)}
		</div>
	);
}

export default parseMessage;
