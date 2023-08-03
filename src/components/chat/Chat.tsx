import styles from "@/app/styles/chatscren.module.css";
import { IoSend } from "react-icons/io5";
import ChatSpace from "@/components/chat/ChatSpace";
import { useChatContext } from "@/context/chatContext";
import { useRef } from "react";

export default function ChatScreen() {
	const { sendMessage } = useChatContext();
	const chatRef = useRef<HTMLInputElement>(null);
	const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (chatRef.current?.value === "" || !chatRef?.current?.value) return;
		sendMessage(chatRef.current?.value as string);
		chatRef.current.value = "";
	};
	return (
		<div className={styles.chats}>
			<ChatSpace />
			<form className={styles.chatInput} onSubmit={handleSend}>
				<input type="text" placeholder="Type a message" ref={chatRef} />
				<button className={styles.icon} type="submit">
					<IoSend size={24} />
				</button>
			</form>
		</div>
	);
}
