'use client';

import { useState } from 'react';
import logo from '../../assets/logo/logo-white.png';
import Image from 'next/image';
import styles from '../styles/chat.module.css';
import { IoChevronDown, IoCopyOutline } from 'react-icons/io5';
import { bulletStyles } from '@/constants/constants';

const Red = () => (
	<span
		style={{
			...bulletStyles,
			backgroundColor: '#e52929'
		}}
	></span>
);
const Green = () => (
	<span
		style={{
			...bulletStyles,
			backgroundColor: '#39ea36'
		}}
	></span>
);

export default function page() {
	const [view, setView] = useState<string>('code');
	const [copyText, setCopyText] = useState<string>('Copy');
	const [open, setOpen] = useState<string>('');
	const [theme, setTheme] = useState<string>('midnight_shadow');
	let code = '123456';
	const onSeeCode = () => {};
	const handleCopy = () => {};
	const onSeeMembers = () => {};
	return (
		<main className={styles.background + ` ${theme}`}>
			<div>
				<Image src={logo} alt="logo" width={40} height={40} />
			</div>
			<section className={styles.chat}>
				<nav className={styles.chat_header + ' cHeader'}>
					<div>Exit</div>
					<div>Chat</div>
				</nav>
				<div className={styles.chats}>Chat screen</div>
				<div className={styles.chat_settings + ' cSettings' + ` open`}>
					<div className={styles.link} onClick={onSeeCode}>
						<h1>
							<span>Room Code</span>
							<span className={styles.icon}>
								<IoChevronDown />
							</span>
						</h1>
						<div className={styles.details + view === 'code' ? 'show' : 'hide'}>
							<p className={styles.content}>
								Share this invitation code with others that you want in the group chat.
							</p>
							<div className={styles.link_code}>{code}</div>
							<button className={styles.copy} onClick={handleCopy}>
								<span className={styles.copyIcon}>
									<IoCopyOutline />
								</span>
								{copyText}
							</button>
						</div>
					</div>
					<div className={styles.participants} onClick={onSeeMembers}>
						<h1>
							<span>Chat Members</span>
							<span className={styles.icon}>
								<IoChevronDown />
							</span>
						</h1>
						<div className={styles.details}>
							<p>
								<Red />
								Name
							</p>
							<p>
								<Green />
								Name
							</p>
							<p>
								<Red />
								Name
							</p>
							<p>
								<Green />
								Name
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
