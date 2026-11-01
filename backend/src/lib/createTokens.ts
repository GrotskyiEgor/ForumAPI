import {type Response } from "express"

const time : number = Number(process.env.ACCESS_TOKEN_TIME)
const refreshTime : number = Number(process.env.REFRESH_TOKEN_TIME)

export function createCookieAccessToken(res: Response, accessToken: string){
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: time * 1000,
        path: "/",
    })
}

export function createCookieRefreshToken(res: Response, refreshToken: string){
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: refreshTime * 1000,
        path: "/auth",
    });
}