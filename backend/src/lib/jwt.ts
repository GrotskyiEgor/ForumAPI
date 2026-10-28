import {type Response } from "express"

import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const secret = process.env.JWT_ACCESS_SECRET || ""
const time : number = Number(process.env.ACCESS_TOKEN_TIME || 900)

if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not configured")
}

export function createAccessToken(userId: number): string {
    return jwt.sign({}, secret, {
        algorithm: "HS256",
        subject: String(userId),
        expiresIn: time,
    })
}

export function createCookieAccessToken(res: Response, accessToken: string){
    res.cookie("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        maxAge: time * 1000,
    })
}

export const authMiddleware = expressjwt({
    secret,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies?.accessToken,
})