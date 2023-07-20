import styles from '@/app/styles/chat.module.css';
import { useRouter } from 'next/navigation';
import { IoExit } from 'react-icons/io5';

type PropsType = {
	chatName: string;
};

export default function ChatNav(props: PropsType) {
	const router = useRouter();
	const onExit = () => {
		router.push('/');
	};
	return (
		<nav className={styles.chat_header}>
			<div className={styles.exit} onClick={onExit}>
				<IoExit size={30} />
			</div>
			<div>{props.chatName}</div>
		</nav>
	);
}
