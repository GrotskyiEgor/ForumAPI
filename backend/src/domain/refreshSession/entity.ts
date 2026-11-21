export interface RefreshSession {
    id: number
    userId: number
    tokenHash: string
    expiresAt: string
    createdAt: string
}

export interface NewRefreshSession {
    userId: number
    tokenHash: string
    expiresAt: Date
}
