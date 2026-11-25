import type { PublicUser } from "../../../domain/user/entity.js";
import type {
	InvalidCredentialsError,
	UserAlreadyExistError,
	UserNotFoundError,
	InvalidRefreshTokenError,
} from "../user/errors.js";

export type Tokens = { accessToken: string; refreshToken: string };

export type RegisterUserResponse =
	| { success: true; data: PublicUser }
	| { success: false; error: UserAlreadyExistError };
export type LoginUserResponse =
	| { success: true; data: { user: PublicUser; tokens: Tokens } }
	| { success: false; error: InvalidCredentialsError };
export type GetUserByIdResponse =
	| { success: true; data: PublicUser }
	| { success: false; error: UserNotFoundError };
export type RefreshUserResponse =
	| { success: true; data: Tokens }
	| { success: false; error: InvalidRefreshTokenError };
