import styles from '@/app/styles/chatscren.module.css';
import { useChatContext } from '@/context/chatContext';

export default function ChatSpace() {
	const { name } = useChatContext();
	const myName = name;

	type MessageProps = {
		username: string;
		message: string;
		status?: string;
	};
	const messages: MessageProps[] = [
		{
			username: 'Gokul',
			message: 'hi'
		},
		{
			username: 'Sreerag',
			message: 'hi'
		}
	];
	return (
		<div className={styles.messagespace}>
			<div className={styles.messages}>
				{messages.reverse().map((message, index) => {
					if (message.status)
						return (
							<div key={index} className={styles.status}>
								{message.message}
							</div>
						);
					else if (message.username === myName)
						return (
							<div key={index} className={styles.mymessage}>
								<div>
									<div className={styles.username}>You</div>
									<div className={styles.body}>{message.message}</div>
								</div>
								<div className={styles.time}>7:43 PM</div>
							</div>
						);
					else
						return (
							<div key={index} className={styles.message}>
								<div className={styles.left}>
									<div className={styles.username}>{message.username}</div>
									<div className={styles.body}>{message.message}</div>
								</div>
								<div className={styles.time}>12:49 PM</div>
							</div>
						);
				})}
			</div>
		</div>
	);
}
