import "dotenv/config";

function required(name: string): string {
	const value = process.env[name];

	if (!value) {
        throw new Error(`${name} is not defined`);
    } 

	return value;
}

function requiredHex(name: string): Buffer {
	const value = required(name);
	if (!/^[0-9a-f]+$/i.test(value) || value.length % 2 !== 0) {
		throw new Error(`${name} must be a hex string`);
	}
	return Buffer.from(value, "hex");
}

function positiveInt(name: string, fallback: number): number {
	const raw = process.env[name];

	if (raw === undefined || raw === "") {
        return fallback;
    }

	const value = Number(raw);
	if (!Number.isSafeInteger(value) || value <= 0) {
		throw new Error(`${name} must be a positive integer`);
	}
	return value;
}

export const config = {
	passwordPepper: requiredHex("PASSWORD_PEPPER"),
	jwt: {
		accessSecret: required("JWT_ACCESS_SECRET"),
		refreshSecret: required("JWT_REFRESH_SECRET"),
		accessTtlMs: positiveInt("ACCESS_TOKEN_TIME", 15 * 60) * 1000,
		refreshTtlMs:
			positiveInt("REFRESH_TOKEN_TIME", 7 * 24 * 60 * 60) * 1000,
	},
} as const;

export type Config = typeof config;
