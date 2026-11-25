export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: string;
}

export type PublicUser = Omit<User, "password">;

export type NewUser = Omit<User, "id" | "createdAt">;
