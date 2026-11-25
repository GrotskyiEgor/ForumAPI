import type { RequestHandler } from "express";
import type { TokenService } from "../../lib/jwt.js";
import { readAccessToken } from "../../lib/createTokens.js";

export function createAuthMiddleware(tokens: TokenService): RequestHandler {
	return (req, res, next) => {
		const token = readAccessToken(req);

		if (!token) {
			res.status(401).json({ error: "Unauthorized" });
			return;
		}

		try {
			res.locals.userId = tokens.verifyAccess(token);
			next();
		} catch {
			res.status(401).json({ error: "Unauthorized" });
		}
	};
}
