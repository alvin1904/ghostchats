'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import styles from '@/app/styles/home.module.css';
import { acceptedChars } from '@/utils/types/code';
import { montserratFont } from '@/utils/fonts';

export const FontStyling = () => (
	<style jsx global>{`
		html {
			font-family: ${montserratFont.style.fontFamily};
		}
	`}</style>
);

export default function Home() {
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
		<main>
			<FontStyling />
			<h1>Welcome to GhostChats</h1>
			<input
				type="text"
				id="roomName"
				placeholder="Enter a name for your room!"
			/>
			<p>
				Visit <button onClick={onCreate}>Create a dark room</button> to go to
				chat page
			</p>
			<br />
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
			<p>
				Visit <button onClick={handleJoin}>Join a dark room</button> to go to
				chat page
			</p>
			<br />
		</main>
	);
}
