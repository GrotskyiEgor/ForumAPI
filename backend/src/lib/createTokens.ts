import type { CookieOptions, Request, Response } from "express";
import { config } from "../config.js";

export const AUTH_COOKIE = {
	ACCESS: "accessToken",
	REFRESH: "refreshToken",
} as const;

const base: CookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax",
};
const access: CookieOptions = { ...base, path: "/" };
const refresh: CookieOptions = { ...base, path: "/auth" };

export function createCookieAccessToken(res: Response, accessToken: string) {
	res.cookie(AUTH_COOKIE.ACCESS, accessToken, {
		...access,
		maxAge: config.jwt.accessTtlMs,
	});
}

export function createCookieRefreshToken(res: Response, refreshToken: string) {
	res.cookie(AUTH_COOKIE.REFRESH, refreshToken, {
		...refresh,
		maxAge: config.jwt.refreshTtlMs,
	});
}

export function clearAuthCookies(res: Response) {
	res.clearCookie(AUTH_COOKIE.ACCESS, access);
	res.clearCookie(AUTH_COOKIE.REFRESH, refresh);
}

export function readAccessToken(req: Request): string | undefined {
	const token: unknown = req.cookies?.[AUTH_COOKIE.ACCESS];
	return typeof token === "string" ? token : undefined;
}

export function readRefreshToken(req: Request): string | undefined {
	const token: unknown = req.cookies?.[AUTH_COOKIE.REFRESH];
	return typeof token === "string" ? token : undefined;
}
