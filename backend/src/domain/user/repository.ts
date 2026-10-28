import type { User, UserRegistrate } from "./entity.js";


export interface UserRepository {
    createUser(userRegistrate: UserRegistrate): Promise<User>;
    getUserByEmail(email: string): Promise<User | undefined>;
    getUserById(id: number): Promise<User | undefined>;
}