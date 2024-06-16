import styles from "@/app/styles/chatscren.module.css";
import { useChatContext } from "@/context/chatContext";

export default function ChatSpace() {
	const { name, messages } = useChatContext();
	return (
		<div className={styles.messagespace}>
			<div className={styles.messages}>
				{messages.map((message, index) => {
					if (message?.info)
						return (
							<div key={index} className={styles.status}>
								{message.message}
							</div>
						);
					else if (message.username === name)
						return (
							<div key={index} className={styles.mymessage}>
								<div>
									<div className={styles.username}>You</div>
									<div className={styles.body}>{message.message}</div>
								</div>
								<div className={styles.time}>{message?.time}</div>
							</div>
						);
					else
						return (
							<div key={index} className={styles.message}>
								<div className={styles.left}>
									<div className={styles.username}>{message.username}</div>
									<div className={styles.body}>{message.message}</div>
								</div>
								<div className={styles.time}>{message?.time}</div>
							</div>
						);
				})}
			</div>
		</div>
	);
}
