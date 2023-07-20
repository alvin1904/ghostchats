export const apiLinkGenerator = (path: string) =>
	`${process.env.NEXT_PUBLIC_API_URL}${path}`;
