import argon2 from "argon2";

export interface PasswordHasher {
	hash(password: string): Promise<string>;
	verify(hash: string, password: string): Promise<boolean>;
}

const ARGON2_OPTIONS = {
	type: argon2.argon2id,
	memoryCost: 19456,
	timeCost: 2,
	parallelism: 1,
} as const;

export function createPasswordHasher(pepper: Buffer): PasswordHasher {
	return {
		hash(password) {
			return argon2.hash(password, { ...ARGON2_OPTIONS, secret: pepper });
		},
		verify(hash, password) {
			return argon2.verify(hash, password, { secret: pepper });
		},
	};
}
