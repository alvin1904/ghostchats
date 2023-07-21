import styles from '@/app/styles/popover.module.css';
import Theme from './Theme';
import { useRef, useState } from 'react';
import { themes } from '@/constants/constants';
import { useChatContext } from '@/context/chatContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

type Props = {
	showPopover: boolean;
};

function convertToTitleCase(inputString: string) {
	let words = inputString.split('_');
	let titleCaseWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let titleCaseString = titleCaseWords.join(' ');
	return titleCaseString;
}

export default function Popover(props: Props) {
	const nameRef = useRef<HTMLInputElement>(null);
	const allThemes: string[] = Object.values(themes);
	const [selected, setSelected] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const { setName, setTheme } = useChatContext();
	const router = useRouter();
	const getTheme = () => allThemes[selected];
	const onGoToRoom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = nameRef.current?.value;
		if (!name) return alert('Please enter your name');
		setLoading(true);
		setName(name);
		setTheme(getTheme());
		router.push('/chat');
		setLoading(false);
	};
	return (
		<form
			className={`${styles.popover} ${
				props.showPopover ? styles.showP : styles.hideP
			}`}
			onSubmit={onGoToRoom}
		>
			<input
				type="text"
				placeholder="Enter your name"
				className={styles.input}
				ref={nameRef}
			/>
			<div className={styles.theme}>
				<h3>Chose a theme for your room</h3>
				<ul className={styles.list}>
					{allThemes.map((theme, index) => {
						return (
							<li
								key={index}
								className={
									theme + ' ' + (selected === index ? styles.selected : '')
								}
								onClick={() => setSelected(allThemes.indexOf(theme))}
							>
								<Theme name={convertToTitleCase(theme)} />
							</li>
						);
					})}
				</ul>
			</div>
			<button type="submit" className={styles.button}>
				{loading ? <Loading color="white" /> : 'Go to dark room'}
			</button>
		</form>
	);
}
