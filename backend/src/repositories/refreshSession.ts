import type { RefreshSessionRepository } from "../domain/refreshSession/repository.js";
import { db } from "../prisma/db";

export function createRefreshSessionRepository(): RefreshSessionRepository {
    return {
        async create({ userId, tokenHash, expiresAt }) {
            return db.orm.public.RefreshSession.create({
                userId,
                tokenHash,
                expiresAt: expiresAt.toISOString(),
            })
        },

        async deleteByTokenHash(tokenHash) {
            const deleted = await db.orm.public.RefreshSession.where({ tokenHash }).delete()

            if (!deleted) {
                return undefined
            }

            return deleted
        },
    }
}
