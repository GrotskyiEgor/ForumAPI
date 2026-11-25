import type { UserRepository } from "../domain/user/repository";
import { db } from "../prisma/db";

export function createUserRepository(): UserRepository {
	return {
		async create(newUser) {
			try {
				return await db.orm.public.User.create(newUser);
			} catch (error) {
				if (
					error instanceof Error &&
					"sqlState" in error &&
					error.sqlState === "23505"
				) {
					throw new Error("EMAIL_ALREADY_EXISTS");
				}
				throw error;
			}
		},

		async getUserByEmail(email) {
			const user = await db.orm.public.User.where({ email }).first();

			if (!user) {
				return undefined;
			}

			return user;
		},

		async getUserById(id) {
			const user = await db.orm.public.User.where({ id }).first();

			if (!user) {
				return undefined;
			}

			return user;
		},
	};
}
