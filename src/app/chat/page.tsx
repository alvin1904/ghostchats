'use client';

import logo from '@/assets/logo/logo-white.png';
import Image from 'next/image';
import styles from '@/app/styles/chat.module.css';
import { FontStyling } from '@/app/page';
import ChatNav from '@/components/chat/Nav';
import ChatSidebar from '@/components/chat/Sidebar';
import ChatScreen from '@/components/chat/Chat';
import { themes } from '@/constants/constants';
import { useChatContext } from '@/context/chatContext';

export default function page() {
	const { theme } = useChatContext();
	const { roomName } = useChatContext();
	return (
		<main className={styles.background + ` ${theme || themes.black}`}>
			<FontStyling />
			<div>
				<Image src={logo} alt="logo" width={32} height={32} />
			</div>
			<section className={styles.chat}>
				<ChatNav chatName={roomName || 'Dark Room'} />
				<ChatScreen />
				<ChatSidebar />
			</section>
		</main>
	);
}
