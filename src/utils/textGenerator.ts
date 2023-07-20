export const createInvitation = (code: number | string) => `
👋 Hello, do you want to chat with us on GhostChats?
You just have to type the code 👉${code}👈 on the site and you'll be able to access my Room.
But watch out, you never know what might happen. 👻

Start chatting now at: ${process.env.NEXT_PUBLIC_CLIENT_URL}
`;
