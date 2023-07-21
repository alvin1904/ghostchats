export const createInvitation = (code: number | string) => `
👋, do you want to chat with us on GhostChats? You just have to type the code 
👉 *${code}* 👈 
on the site and you'll be able to access my Room. But watch out, you never know what might happen. 👻

Join us now at: ${process.env.NEXT_PUBLIC_CLIENT_URL}
`;
