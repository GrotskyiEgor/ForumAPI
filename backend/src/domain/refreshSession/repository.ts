import type { NewRefreshSession, RefreshSession } from "./entity.js";

export interface RefreshSessionRepository {
    create(session: NewRefreshSession): Promise<RefreshSession>;
    deleteByTokenHash(tokenHash: string): Promise<RefreshSession | undefined>;
}
