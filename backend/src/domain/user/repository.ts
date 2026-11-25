import type { NewUser, User } from "./entity.js";

export interface UserRepository {
	create(user: NewUser): Promise<User>;
	getUserByEmail(email: string): Promise<User | undefined>;
	getUserById(id: number): Promise<User | undefined>;
}
