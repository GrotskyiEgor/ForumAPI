import type { RefreshSessionRepository } from "../domain/refreshSession/repository.js";
import { db } from "../prisma/db";

export function createRefreshSessionRepository(): RefreshSessionRepository {
	return {
		async create({ userId, tokenHash, expiresAt }) {
			return db.orm.public.RefreshSession.create({
				userId,
				tokenHash,
				expiresAt: expiresAt.toISOString(),
			});
		},

		async getByTokenHash(tokenHash) {
			const session = await db.orm.public.RefreshSession.where({
				tokenHash,
			}).first();

			if (!session) {
				return undefined;
			}

			return session;
		},

		async rotate({ oldHash, newHash, expiresAt }) {
			const changed = await db.orm.public.RefreshSession.where({
				tokenHash: oldHash,
			}).update({
				tokenHash: newHash,
				expiresAt: expiresAt.toISOString(),
			});

			return Boolean(changed);
		},

		async deleteByTokenHash(tokenHash) {
			await db.orm.public.RefreshSession.where({ tokenHash }).delete();
		},
	};
}
