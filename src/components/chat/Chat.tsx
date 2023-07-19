import styles from '@/app/styles/chatscren.module.css';
import { IoSend } from 'react-icons/io5';
import ChatSpace from '@/components/chat/ChatSpace';

export default function ChatScreen() {
	return (
		<div className={styles.chats}>
			<ChatSpace />
			<form className={styles.chatInput}>
				<input type="text" placeholder="Type a message" />
				<span className={styles.icon}>
					<IoSend size={24} />
				</span>
			</form>
		</div>
	);
}
