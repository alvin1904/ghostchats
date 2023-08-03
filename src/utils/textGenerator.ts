export const createInvitation = (code: number | string) => `
👋, do you want to chat with us on GhostChats? You just have to type the code 
👉 *${code}* 👈 
on the site and you'll be able to access my Room. But watch out, you never know what might happen. 👻

Join us now at: ${process.env.NEXT_PUBLIC_CLIENT_URL}
`;

export const getTime = () => {
	const time = new Date().toString().substring(16, 21);
	let hours = Number(time.substring(0, 2));
	const minutes = time.substring(3, 5);
	const AmPm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours !== 0 ? hours : 12;
	return `${hours}:${minutes} ${AmPm}`;
};

export const id = () => Number(Math.random().toString().substring(2, 7));
