import jwt from "jsonwebtoken";
import { createHash, randomUUID } from "node:crypto";

type TokenKind = "access" | "refresh";

export interface TokenService {
	signAccess(userId: number): string;
	signRefresh(userId: number): string;
	verifyAccess(token: string): number;
	verifyRefresh(token: string): number;
	hash(token: string): string;
}

export interface TokenServiceOptions {
	accessSecret: string;
	refreshSecret: string;
	accessTtlMs: number;
	refreshTtlMs: number;
}

interface SignParams {
	userId: number;
	type: TokenKind;
	secret: string;
	ttlMs: number;
}

interface VerifyParams {
	token: string;
	type: TokenKind;
	secret: string;
}

export function createTokenService(options: TokenServiceOptions): TokenService {
	function sign({ userId, type, secret, ttlMs }: SignParams): string {
		return jwt.sign({ type }, secret, {
			algorithm: "HS256",
			subject: String(userId),
			expiresIn: Math.floor(ttlMs / 1000),
			jwtid: randomUUID(),
		});
	}

	function verify({ token, type, secret }: VerifyParams): number {
		try {
			const payload = jwt.verify(token, secret, {
				algorithms: ["HS256"],
			});

			if (
				typeof payload === "string" ||
				payload.type !== type ||
				typeof payload.sub !== "string"
			) {
				throw new Error();
			}

			const userId = Number(payload.sub);

			if (!Number.isSafeInteger(userId) || userId <= 0) {
				throw new Error();
			}

			return userId;
		} catch {
			throw new Error("Invalid token");
		}
	}

	return {
		signAccess: (userId) =>
			sign({
				userId,
				type: "access",
				secret: options.accessSecret,
				ttlMs: options.accessTtlMs,
			}),
		signRefresh: (userId) =>
			sign({
				userId,
				type: "refresh",
				secret: options.refreshSecret,
				ttlMs: options.refreshTtlMs,
			}),
		verifyAccess: (token) =>
			verify({ token, type: "access", secret: options.accessSecret }),
		verifyRefresh: (token) =>
			verify({ token, type: "refresh", secret: options.refreshSecret }),
		hash: (token) =>
			createHash("sha256").update(token, "utf8").digest("hex"),
	};
}
