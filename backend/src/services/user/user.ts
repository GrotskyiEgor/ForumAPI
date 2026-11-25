import type { UserService, UserServiceDeps } from "./types.js";
import type { PublicUser, User } from "../../domain/user/entity.js";
import type { Tokens } from "../../transport/dto/user/response.js";
import {
	InvalidCredentialsError,
	UserAlreadyExistError,
	UserNotFoundError,
	InvalidRefreshTokenError,
} from "../../transport/dto/user/errors.js";

function toPublicUser({ password: _password, ...user }: User): PublicUser {
	return user;
}

function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

export function createUserService({
	users,
	sessions,
	passwords,
	tokens,
	refreshTtlMs,
}: UserServiceDeps): UserService {
	const refreshExpiresAt = () => new Date(Date.now() + refreshTtlMs);

	async function issueTokens(userId: number): Promise<Tokens> {
		const accessToken = tokens.signAccess(userId);
		const refreshToken = tokens.signRefresh(userId);

		await sessions.create({
			userId,
			tokenHash: tokens.hash(refreshToken),
			expiresAt: refreshExpiresAt(),
		});

		return { accessToken, refreshToken };
	}

	return {
		async registerUser(userRegistrate) {
			const email = normalizeEmail(userRegistrate.email);
			const password = await passwords.hash(userRegistrate.password);

			try {
				const createdUser = await users.create({
					name: userRegistrate.name,
					email,
					password,
				});
				return { success: true, data: toPublicUser(createdUser) };
			} catch (error) {
				if (
					error instanceof Error &&
					error.message === "EMAIL_ALREADY_EXISTS"
				) {
					return {
						success: false,
						error: new UserAlreadyExistError(),
					};
				}
				throw error;
			}
		},

		async loginUser(userLogin) {
			const email = normalizeEmail(userLogin.email);
			const user = await users.getUserByEmail(email);

			if (
				!user ||
				!(await passwords.verify(user.password, userLogin.password))
			) {
				return { success: false, error: new InvalidCredentialsError() };
			}

			const issued = await issueTokens(user.id);

			return {
				success: true,
				data: { user: toPublicUser(user), tokens: issued },
			};
		},

		async refresh(refreshToken) {
			let userId: number;

			try {
				userId = tokens.verifyRefresh(refreshToken);
			} catch {
				return {
					success: false,
					error: new InvalidRefreshTokenError(),
				};
			}

			const oldHash = tokens.hash(refreshToken);
			const session = await sessions.getByTokenHash(oldHash);

			if (
				!session ||
				session.userId !== userId ||
				new Date(session.expiresAt) <= new Date()
			) {
				return {
					success: false,
					error: new InvalidRefreshTokenError(),
				};
			}

			const user = await users.getUserById(userId);

			if (!user) {
				return {
					success: false,
					error: new InvalidRefreshTokenError(),
				};
			}

			const newRefreshToken = tokens.signRefresh(user.id);
			const rotated = await sessions.rotate({
				oldHash,
				newHash: tokens.hash(newRefreshToken),
				expiresAt: refreshExpiresAt(),
			});

			if (!rotated) {
				return {
					success: false,
					error: new InvalidRefreshTokenError(),
				};
			}

			return {
				success: true,
				data: {
					accessToken: tokens.signAccess(user.id),
					refreshToken: newRefreshToken,
				},
			};
		},

		async me(userId) {
			const user = await users.getUserById(userId);

			if (!user) {
				return { success: false, error: new UserNotFoundError() };
			}

			return { success: true, data: toPublicUser(user) };
		},

		async logout(refreshToken) {
			await sessions.deleteByTokenHash(tokens.hash(refreshToken));
		},
	};
}
