import "dotenv/config";

import argon2 from "argon2"
import { createHmac } from "node:crypto"

const pepper = process.env.PASSWORD_PEPPER

if (!pepper) {
    throw new Error("PASSWORD_PEPPER is not configured")
}

function applyPepper(password: string): string {
    return createHmac("sha256", pepper!).update(password, "utf8").digest("hex")
}

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(applyPepper(password), {type: argon2.argon2id,})
}

export async function verifyPassword( passwordHash: string, password: string): Promise<boolean> {
    return argon2.verify(passwordHash,applyPepper(password))
}