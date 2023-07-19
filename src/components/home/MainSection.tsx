import styles from '@/app/styles/mainSection.module.css';
import { ChangeEvent, useState } from 'react';
import { acceptedChars } from '@/utils/types/code';

export default function MainSection() {
	const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const changeFocus = (value: string, id: number) => {
			const target = `key${value === '' ? id - 1 : id + 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		};
		e.preventDefault();
		// HANDLING INPUT
		const value = e.key;
		if (!acceptedChars.includes(value)) return;
		const id = parseInt(e.currentTarget.id[e.currentTarget.id.length - 1]);
		setCode((prevCode) => {
			const temp = [...prevCode];
			if (value === 'Backspace') temp[id] = '';
			else {
				let existing = temp[id];
				if (id + 1 === 6 && existing !== '') return temp;
				temp[existing === '' ? id : id + 1] = value;
			}
			return temp;
		});
		// CHANGING FOCUS
		if (value === 'Backspace') changeFocus('', id);
		else changeFocus(value, id);
	};

	const onCreate = () => {
		console.log('create');
	};

	const handleJoin = () => {
		console.log('join');
	};
	return (
		<div className={styles.section}>
			<div className={styles.subsec}>
				<input
					type="text"
					className={styles.roomName}
					id="roomName"
					placeholder="Enter a room name!"
				/>
				<button onClick={onCreate}>Create a dark room</button>
			</div>
			<div>OR</div>
			<div className={styles.subsec}>
				<div className={styles.roomCode}>
					{code.map((text, index) => {
						return (
							<input
								key={index}
								type="text"
								id={`key${index}`}
								value={text}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									e.preventDefault();
									return;
								}}
								onKeyDown={handleChange}
								maxLength={1}
							/>
						);
					})}
				</div>
				<button onClick={handleJoin}>Join dark room</button>
			</div>
		</div>
	);
}
