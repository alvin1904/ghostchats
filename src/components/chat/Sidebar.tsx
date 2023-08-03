import styles from "@/app/styles/chat.module.css";
import { bulletStyles } from "@/constants/constants";
import { useChatContext } from "@/context/chatContext";
import { createInvitation } from "@/utils/textGenerator";
import { useState } from "react";
import { IoChevronDown, IoCopyOutline } from "react-icons/io5";

type BulletProp = {
	color: string;
};
const Bullet = (prop: BulletProp) => (
	<span
		style={{
			...bulletStyles,
			backgroundColor: prop.color === "red" ? "#e52929" : "#39ea36",
		}}
	></span>
);

type viewsType = "code" | "members";

export default function ChatSidebar() {
	const def = "Copy invitation code";
	const [view, setView] = useState<viewsType>("code");
	const [copyText, setCopyText] = useState<string>(def);
	const [open, setOpen] = useState<string>("");

	const { roomId, members, showError } = useChatContext();
	let code = roomId;
	const handleCopy = () => {
		setCopyText("Copied!");
		navigator.clipboard.writeText(createInvitation(code));
		showError("Copied to clipboard!");
		setTimeout(() => setCopyText(def), 2000);
	};
	const onSeeCode = () => {
		if (copyText !== "Copied") {
			setView("code");
			setOpen(open === "open" ? "" : "open");
		}
	};
	const onSeeMembers = () => {
		if (copyText !== "Copied") {
			setView("members");
			setOpen(open === "open" ? "" : "open");
		}
	};
	return (
		<div
			className={`${styles.chat_settings} ${
				open === "open" ? styles.open : styles.close
			}`}
		>
			<div className={styles.link}>
				<h1 onClick={onSeeCode}>
					Room Code
					<span className={styles.arrow}>
						<IoChevronDown />
					</span>
				</h1>
				<div
					className={`${styles.details} ${
						view === "code" ? styles.show : styles.hide
					}`}
				>
					<p className={styles.content}>
						Share this invitation code with others that you want in the group
						chat.
					</p>
					<p className={styles.link_code}>{code}</p>
					<button className={styles.copy} onClick={handleCopy}>
						<span className={styles.copyIcon}>
							<IoCopyOutline />
						</span>
						{def}
					</button>
				</div>
			</div>
			<div className={styles.participants}>
				<h1 onClick={onSeeMembers}>
					Chat Members
					<span className={styles.arrow}>
						<IoChevronDown />
					</span>
				</h1>
				<div
					className={`${styles.details} ${styles.mems} ${
						view === "members" ? styles.show : styles.hide
					}`}
				>
					{members.map((member, index) => {
						return (
							<p key={index}>
								<Bullet color="green" />
								{member}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
