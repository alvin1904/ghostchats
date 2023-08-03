import Head from "next/head";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ChatProvider } from "@/context/chatContext";
import ErrorHandler from "@/components/ErrorHandler";

export const metadata: Metadata = {
	title: "Ghastchats",
	description:
		"GhostChat is an ephemeral group chat platform that allows you to create private rooms and engage in secure, anonymous conversations. With GhostChat, you can generate unique codes, share them with others, and experience the thrill of ghostly connections. Once the window closes, all traces vanish, leaving no digital footprints behind.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="./favicon.ico" />
			</Head>
			<body>
				<ChatProvider>
					<ErrorHandler />
					{children}
				</ChatProvider>
			</body>
		</html>
	);
}
