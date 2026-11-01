import {type Response } from "express"

import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const accessSecret = process.env.JWT_ACCESS_SECRET || ""
const refreshSecret = process.env.JWT_REFRESH_SECRET || ""
const time : number = Number(process.env.ACCESS_TOKEN_TIME)
const refreshTime : number = Number(process.env.REFRESH_TOKEN_TIME)

if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET is not configured")
}

if (!refreshSecret) {
    throw new Error("JWT_REFRESH_SECRET is not configured")
}

export const authMiddleware = expressjwt({
    secret: accessSecret,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies?.accessToken,
})

export function signAccessToken(userId: number): string {
    return jwt.sign({}, accessSecret, {
        algorithm: "HS256",
        subject: String(userId),
        expiresIn: time,
    })
}

export function signRefreshToken(userId: number): string {
    return jwt.sign({type: "refresh"}, refreshSecret, {
        algorithm: "HS256",
        subject: String(userId),
        expiresIn: refreshTime,
    })
}

export function verifyRefreshToken(token: string): number {
	try{
		const payload = jwt.verify(token, refreshSecret!, { algorithms: ["HS256"] });
		if (typeof payload === "string" ||  payload.type !== "refresh" || typeof payload.sub !== "string"){
			throw new Error()
		}
		const userId = Number(payload.sub)
		if (!Number.isSafeInteger(userId) || userId <= 0) throw new Error()
		return userId
	} catch (error)	{
		throw new Error("Invalid token")
	}
}