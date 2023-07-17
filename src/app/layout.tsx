import './styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Ghastchats',
	description:
		'GhostChat is an ephemeral group chat platform that allows you to create private rooms and engage in secure, anonymous conversations. With GhostChat, you can generate unique codes, share them with others, and experience the thrill of ghostly connections. Once the window closes, all traces vanish, leaving no digital footprints behind.'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
