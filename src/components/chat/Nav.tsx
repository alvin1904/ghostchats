import styles from '@/app/styles/chat.module.css';
import { useChatContext } from '@/context/chatContext';
import { useRouter } from 'next/navigation';
import { IoExit } from 'react-icons/io5';

type PropsType = {
	chatName: string;
};

export default function ChatNav(props: PropsType) {
	const router = useRouter();
	const { closeSession } = useChatContext();
	const onExit = () => {
		if (typeof window !== 'undefined') router.push('/');
		closeSession();
		console.error('Signed out');
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
