import type { Response, Request } from "express";
import type { PublicUser } from "../../../domain/user/entity.js";

export interface UserHandlers {
	registerUser(
		req: Request<{}, {}, { name: string; email: string; password: string }>,
		res: Response,
	): Promise<Response<PublicUser | { error: string }>>;
	loginUser(
		req: Request<{}, {}, { email: string; password: string }>,
		res: Response,
	): Promise<Response<PublicUser | { error: string }>>;
	refresh(
		req: Request,
		res: Response,
	): Promise<Response<{ message: string } | { error: string }>>;
	me(
		req: Request,
		res: Response,
	): Promise<Response<PublicUser | { error: string }>>;
	logout(
		req: Request,
		res: Response,
	): Promise<Response<{ message: string } | { error: string }>>;
}
