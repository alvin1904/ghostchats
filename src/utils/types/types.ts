export type ErrorType = {
	message: string;
	id: number;
};

export type MessageType = {
	username: string;
	message: string;
	info?: boolean;
	time?: string;
};
