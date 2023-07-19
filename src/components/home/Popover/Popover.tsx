import styles from '@/app/styles/popover.module.css';
import Theme from './Theme';
import { useState } from 'react';
import { themes } from '@/constants/constants';

function convertToTitleCase(inputString: string) {
	let words = inputString.split('_');
	let titleCaseWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let titleCaseString = titleCaseWords.join(' ');
	return titleCaseString;
}

export default function Popover() {
	const allThemes: string[] = Object.values(themes);
	const [selected, setSelected] = useState<number>(0);
	const onGoToRoom = () => {
		console.log('Go to room');
	};
	return (
		<div className={styles.popover}>
			<input
				type="text"
				placeholder="Enter your name"
				className={styles.input}
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
			<input
				type="button"
				className={styles.button}
				onClick={onGoToRoom}
				value={'Go to dark room'}
			/>
		</div>
	);
}
