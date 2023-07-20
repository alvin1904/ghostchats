import styles from '@/app/styles/mainSection.module.css';
import { ChangeEvent, useRef, useState } from 'react';
import { acceptedChars } from '@/utils/types/code';
import Popover from './Popover/Popover';
import { useChatContext } from '@/context/chatContext';
import { apiLinkGenerator } from '@/utils/linkGenerator';

export default function MainSection() {
	const nameRef = useRef<HTMLInputElement>(null);
	const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
	const [showPopover, setShowPopover] = useState<boolean>(false);

	const { setRoomName, setRoomId } = useChatContext();

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// FOR DESKTOP
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

	const handleNext = (e: ChangeEvent<HTMLInputElement>) => {
		// FOR MOBILE
		const value = e.target.value;
		const id = parseInt(e.currentTarget.id[e.currentTarget.id.length - 1]);
		setCode((prevCode) => {
			const temp = [...prevCode];
			temp[id] = value;
			return temp;
		});
		if (value === '') {
			const target = `key${id - 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		} else {
			const target = `key${id + 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		}
	};

	const onCreate = async () => {
		const name = nameRef.current?.value;
		if (!name) return alert('Enter a room name!');
		setRoomName(name);
		try {
			const res = await fetch(apiLinkGenerator('room-ids'));
			if (res.status !== 200) throw new Error('Something went wrong');
			const data = await res.json();
			const id = data?.data?.roomId;
			if (!id) throw new Error('Server is down!');
			setRoomId(id.toString());
			setShowPopover(true);
		} catch (err) {
			console.log(err);
			alert('Something went wrong');
		}
	};
	const checkCode = () => {
		for (let c in code) {
			let ch = code[c];
			console.log(ch);
			console.log(!acceptedChars.includes(ch));
			if (ch === '' || !acceptedChars.includes(ch)) return false;
		}
		return true;
	};
	const handleJoin = () => {
		if (!checkCode()) return alert('Check the code and try again!');
		const roomCode = code.join('');
		setRoomId(roomCode);
		setShowPopover(true);
	};
	return (
		<div className={styles.section}>
			<div className={styles.subsec}>
				<input
					type="text"
					className={styles.roomName}
					id="roomName"
					placeholder="Enter a room name!"
					ref={nameRef}
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
								onChange={handleNext}
								onKeyDown={handleChange}
								maxLength={1}
							/>
						);
					})}
				</div>
				<button onClick={handleJoin}>Join dark room</button>
				<Popover showPopover={showPopover} />
			</div>
		</div>
	);
}
