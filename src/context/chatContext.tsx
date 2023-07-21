'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

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
	closeSession: () => {}
});

export function ChatProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<string>('midnight_shadow');
	const [roomId, setRoomId] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [roomName, setRoomName] = useState<string>('');
	const closeSession = () => {
		setRoomId('');
		setName('');
		setRoomName('');
		setTheme('');
		console.log('Session closed');
	};
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
				closeSession
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatContext);
