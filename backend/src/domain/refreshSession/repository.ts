import type { NewRefreshSession, RefreshSession } from "./entity.js";

export interface RotateRefreshSession {
	oldHash: string;
	newHash: string;
	expiresAt: Date;
}

export interface RefreshSessionRepository {
	create(session: NewRefreshSession): Promise<RefreshSession>;
	getByTokenHash(tokenHash: string): Promise<RefreshSession | undefined>;
	rotate(data: RotateRefreshSession): Promise<boolean>;
	deleteByTokenHash(tokenHash: string): Promise<void>;
}
