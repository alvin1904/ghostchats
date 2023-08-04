import styles from "@/app/styles/mainSection.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { acceptedChars } from "@/utils/types/code";
import Popover from "./Popover/Popover";
import { useChatContext } from "@/context/chatContext";
// import { apiLinkGenerator } from '@/utils/linkGenerator';
import Loading from "../Loading";

export default function MainSection() {
	const nameRef = useRef<HTMLInputElement>(null);
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const [showPopover, setShowPopover] = useState<boolean>(false);
	// const [loading1, setLoading1] = useState<boolean>(false);
	const [loading2, setLoading2] = useState<boolean>(false);

	const { setRoomId, showError } = useChatContext();

	const checkCode = () => {
		for (let c in code) {
			let ch = code[c];
			if (ch === "" || !acceptedChars.includes(ch)) return false;
		}
		return true;
	};

	const joinRoom = async () => {
		if (!checkCode()) return showError("Check the code and try again!");
		setLoading2(true);
		const roomCode = code.join("");
		setRoomId(roomCode);
		setShowPopover(true);
		setLoading2(false);
	};

	const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// FOR DESKTOP
		const changeFocus = (value: string, id: number) => {
			const target = `key${value === "" ? id - 1 : id + 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		};
		e.preventDefault();
		// HANDLING INPUT
		const value = e.key;
		if (value === "Enter") return joinRoom();
		if (!acceptedChars.includes(value)) return;
		const id = parseInt(e.currentTarget.id[e.currentTarget.id.length - 1]);
		setCode((prevCode) => {
			const temp = [...prevCode];
			if (value === "Backspace") temp[id] = "";
			else {
				let existing = temp[id];
				if (id + 1 === 6 && existing !== "") return temp;
				temp[existing === "" ? id : id + 1] = value;
			}
			return temp;
		});
		// CHANGING FOCUS
		if (value === "Backspace") changeFocus("", id);
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
		if (value === "") {
			const target = `key${id - 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		} else {
			const target = `key${id + 1}`;
			const input = document.getElementById(target);
			if (input) input.focus();
		}
	};
	
	const onJoin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		joinRoom();
	};
	return (
		<div className={styles.section}>
			<form className={styles.subsec} onSubmit={onJoin}>
				<h2 className={styles.heading2}>
					Enter a random code to create a room or one provided by friends to
					join their room!
				</h2>
				<div className={styles.roomCode}>
					{code.map((text, index) => {
						return (
							<input
								key={index}
								type="number"
								id={`key${index}`}
								value={text}
								onChange={handleNext}
								onKeyDown={handleChange}
								maxLength={1}
								autoComplete="off"
							/>
						);
					})}
				</div>
				<button type="submit">
					{loading2 ? <Loading /> : "Join dark room"}
				</button>
			</form>
			<Popover showPopover={showPopover} />
		</div>
	);
}
