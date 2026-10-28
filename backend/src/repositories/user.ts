import { hashPassword } from "../lib/password";
import type { UserRepository } from "../domain/user/repository";
import { db } from "../prisma/db";

export function createUserRepository(): UserRepository {
    return {

        async createUser(userRegistrate) {
            const user = await db.orm.public.User.create({
                ...userRegistrate,
                password: await hashPassword(userRegistrate.password),
            })

            return user
        },

        async getUserByEmail(email) {
            const user = await db.orm.public.User.where({ email }).first()

            if (!user) {
                return undefined;
            }

            return user
        }
    }
}