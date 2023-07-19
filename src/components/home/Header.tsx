import styles from '@/app/styles/home.module.css';
import Image from 'next/image';
import img from '@/assets/logo/logo-white.png';

export default function Header() {
	return (
		<header className={styles.header}>
			<Image src={img} alt="logo" height={80} width={80} />
			<h1 className={styles.head}>GhostChats</h1>
			<h5>where conversations haunt the present</h5>
		</header>
	);
}
