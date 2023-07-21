'use client';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { io, Socket } from 'socket.io-client';

type MessageType = { username: string; message: string };

type chatContextType = {
	theme: string;
	setTheme: (theme: string) => void;
	roomId: string;
	setRoomId: (code: string) => void;
	name: string;
	setName: (name: string) => void;
	roomName: string;
	setRoomName: (roomName: string) => void;
	closeSession: () => void;
	messages: MessageType[];
	sendMessage: (message: string) => void;
};

const ChatContext = createContext<chatContextType>({
	theme: 'midnight_shadow',
	setTheme: () => {},
	roomId: '',
	setRoomId: () => {},
	name: '',
	setName: () => {},
	roomName: '',
	setRoomName: () => {},
	closeSession: () => {},
	messages: [],
	sendMessage: () => {}
});

export function ChatProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<string>('midnight_shadow');
	const [roomId, setRoomId] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [roomName, setRoomName] = useState<string>('');
	const [joined, setJoined] = useState<boolean>(false);
	const [messageReceived, setMessageReceived] = useState<boolean>(false);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const closeSession = () => {
		setRoomId('');
		setName('');
		setRoomName('');
		setTheme('');
		setMessages([]);
		console.log('Session closed');
	};
	const [socket, setSocket] = useState<Socket | null>(null);
	useEffect(() => {
		const connect = () => {
			const server_addr = `${process.env.NEXT_PUBLIC_API_URL_WS}room-id=${roomId}&name=${name}`;
			const newSocket = io(server_addr);
			setSocket(newSocket);
			setJoined(true);
		};

		if (!joined && roomId !== '' && name !== '') connect();
	}, [joined, roomId, name]);

	socket?.on('error', (error) => {
		console.error(error);
	});
	socket?.on('connect_error', (error) => {
		console.log('connect_error');
		console.log(error);
	});

	const sendMessage = (message: string) => {
		if (!joined) return;
		const messageObject: MessageType = { username: name, message: message };
		setMessages((messages) => [messageObject, ...messages]);
		socket?.emit('send_chat', messageObject);
		console.log('message send');
	};

	useEffect(() => {
		if (!socket) return;
		socket?.on('receive_chat', (data) => {
			let mess: MessageType = data.data;
			setMessages((messages) => [mess, ...messages]);
		});
		return () => {
			socket?.off('receive_chat');
		};
	}, [socket]);

	return (
		<ChatContext.Provider
			value={{
				theme,
				setTheme,
				roomId,
				setRoomId,
				name,
				setName,
				roomName,
				setRoomName,
				closeSession,
				messages,
				sendMessage
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatContext);
