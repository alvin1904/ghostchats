import styles from "@/app/styles/popover.module.css";
import Theme from "./Theme";
import { use, useEffect, useRef, useState } from "react";
import { themes } from "@/constants/constants";
import { useChatContext } from "@/context/chatContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

type Props = {
	showPopover: boolean;
};

function convertToTitleCase(inputString: string) {
	let words = inputString.split("_");
	let titleCaseWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	let titleCaseString = titleCaseWords.join(" ");
	return titleCaseString;
}

export default function Popover(props: Props) {
	const nameRef = useRef<HTMLInputElement>(null);
	const allThemes: string[] = Object.values(themes);
	const [selected, setSelected] = useState<number>(0);
	const { setName, setTheme, showError } = useChatContext();
	const router = useRouter();
	const getTheme = () => allThemes[selected];
	const onGoToRoom = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = nameRef.current?.value;
		if (!name) return showError("Please enter your name!");
		setName(name);
		setTheme(getTheme());
		router.push("/chat");
	};
	useEffect(() => {
		if (props.showPopover) nameRef.current?.focus();
	}, [props.showPopover]);
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
				autoComplete="off"
			/>
			<div className={styles.theme}>
				<h3>Chose a theme for your room</h3>
				<ul className={styles.list}>
					{allThemes.map((theme, index) => {
						return (
							<li
								key={index}
								className={
									theme + " " + (selected === index ? styles.selected : "")
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
				Go to dark room
			</button>
		</form>
	);
}
