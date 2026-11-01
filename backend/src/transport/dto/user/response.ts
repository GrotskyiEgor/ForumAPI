import type { User } from "../../../domain/user/entity.js";
import type { PasswordNotCorrectError, EmailNotCorrectError, UserAlreadyExistError, UserNotFoundError, InvalidRefreshTokenError } from "../user/errors.js";

export type Tokens = { accessToken: string; refreshToken: string }

export type RegisterUserResponse = { success: true; data: User} | { success: false; error: UserAlreadyExistError}
export type LoginUserResponse = { success: true; data: User} | { success: false; error: PasswordNotCorrectError | EmailNotCorrectError }
export type GetUserByIdResponse = { success: true; data: User} | { success: false; error: UserNotFoundError}
export type RefreshUserResponse = { success: true; data: Tokens} | { success: false; error: InvalidRefreshTokenError}