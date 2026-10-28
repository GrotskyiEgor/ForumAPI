import type { User } from "../../../domain/user/entity.js";
import type { PasswordNotCorrectError, EmailNotCorrectError, UserAlreadyExistError, UserNotFoundError } from "../user/errors.js";

export type RegisterUserResponse = { success: true; data: User} | { success: false; error: UserAlreadyExistError}
export type LoginUserResponse = { success: true; data: User} | { success: false; error: PasswordNotCorrectError | EmailNotCorrectError }
export type GetUserByIdResponse = { success: true; data: User} | { success: false; error: UserNotFoundError}