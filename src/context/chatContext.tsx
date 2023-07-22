'use client';
import { getTime } from '@/utils/textGenerator';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { io, Socket } from 'socket.io-client';

type MessageType = {
	username: string;
	message: string;
	info?: boolean;
	time?: string;
};

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
	members: string[];
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
	sendMessage: () => {},
	members: []
});

export function ChatProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<string>('midnight_shadow');
	const [roomId, setRoomId] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [roomName, setRoomName] = useState<string>('');
	const [joined, setJoined] = useState<boolean>(false);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [members, setMembers] = useState<string[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);
	const closeSession = () => {
		setRoomId('');
		setName('');
		setRoomName('');
		setTheme('');
		setMessages([]);
		setMembers([]);
		socket?.close();
		setSocket(null);
		setJoined(false);
		console.log('Session closed');
	};
	useEffect(() => {
		const connect = () => {
			const server_addr = `${process.env.NEXT_PUBLIC_API_URL_WS}room-id=${roomId}&name=${name}`;
			const newSocket = io(server_addr);
			setSocket(newSocket);
			setMembers([`${name} (You)`]);
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
		const messageObject: MessageType = {
			username: name,
			message: message,
			time: getTime()
		};
		setMessages((messages) => [messageObject, ...messages]);
		socket?.emit('send_chat', messageObject);
		console.log('message send');
	};

	const sendStatus = (status: string) => {
		let mess = {
			username: 'ghostchats',
			message: status,
			info: true
		};
		console.log(mess);
		setMessages((messages) => [mess, ...messages]);
	};

	useEffect(() => {
		if (!socket) return;
		socket?.on('receive_chat', (data) => {
			let mess: MessageType = data.data;
			if (!members.includes(mess.username))
				setMembers((members) => [...members, mess.username]);
			setMessages((messages) => [mess, ...messages]);
		});
		return () => {
			socket?.off('receive_chat');
		};
	}, [socket, messages, members]);

	useEffect(() => {
		if (!socket) return;
		socket?.on('user_joined', (data) => {
			sendStatus(`${data} joined the room`);
			members.push(data);
		});
		return () => {
			socket?.off('user_joined');
		};
	}, [socket, messages, members]);

	useEffect(() => {
		if (!socket) return;
		socket?.on('user_left', (data) => {
			sendStatus(`${data} left the room`);
			if (members.includes(data)) members.splice(members.indexOf(data), 1);
		});
		return () => {
			socket?.off('user_left');
		};
	}, [socket, members, messages]);

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
				sendMessage,
				members
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatContext);
