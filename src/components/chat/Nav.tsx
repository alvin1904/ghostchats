import styles from '@/app/styles/chat.module.css';
import { IoExit } from 'react-icons/io5';

type PropsType = {
	chatName: string;
};

export default function ChatNav(props: PropsType) {
	return (
		<nav className={styles.chat_header}>
			<div className={styles.exit}>
				<IoExit size={30} />
			</div>
			<div>{props.chatName}</div>
		</nav>
	);
}
