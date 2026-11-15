import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Токен не передан" });
    }

    try {
        const payload = jwt.verify(token, config.accessSecret);

        if (typeof payload === "string" || !payload.sub) {
        return res.status(401).json({ message: "Некорректный токен" });
        }

        req.auth = { sub: payload.sub };
        next();
    } catch {
        return res.status(401).json({ message: "Токен недействителен или истёк" });
    }
};