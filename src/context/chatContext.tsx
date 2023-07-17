"use client"
import { ReactNode, createContext, useContext, useState } from 'react';

type chatContextType = {
	theme: string;
	setTheme: (theme: string) => void;
	code: string;
	setCode: (code: string) => void;
	name: string;
	setName: (name: string) => void;
};

const ChatContext = createContext<chatContextType>({
	theme: 'midnight_shadow',
	setTheme: () => {},
	code: '',
	setCode: () => {},
	name: 'Dark Room',
	setName: () => {}
});

export function ChatProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState('midnight_shadow');
	const [code, setCode] = useState('');
	const [name, setName] = useState('Dark Room');

	return (
		<ChatContext.Provider
			value={{ theme, setTheme, code, setCode, name, setName }}
		>
			{children}
		</ChatContext.Provider>
	);
}

export const useChatContext = () => useContext(ChatContext);
