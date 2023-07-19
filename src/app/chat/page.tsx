import logo from '@/assets/logo/logo-white.png';
import Image from 'next/image';
import styles from '@/app/styles/chat.module.css';
import { FontStyling } from '@/app/page';
import ChatNav from '@/components/chat/Nav';
import ChatSidebar from '@/components/chat/Sidebar';
import ChatScreen from '@/components/chat/Chat';
import { themes } from '@/constants/constants';

export default function page() {
	let theme = themes.black;
	return (
		<main className={styles.background + ` ${theme}`}>
			<FontStyling />
			<div>
				<Image src={logo} alt="logo" width={32} height={32} />
			</div>
			<section className={styles.chat}>
				<ChatNav chatName={'Dark Room'} />
				<ChatScreen />
				<ChatSidebar />
			</section>
		</main>
	);
}
