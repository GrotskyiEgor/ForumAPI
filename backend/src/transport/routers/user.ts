import { type RequestHandler, Router } from "express";
import type { UserHandlers } from "../handlers/user/types.js";

export function createUserRouter(
	userHandler: UserHandlers,
	requireAuth: RequestHandler,
): Router {
	const router: Router = Router();

	router.post("/login", userHandler.loginUser);
	router.post("/register", userHandler.registerUser);
	router.post("/refresh", userHandler.refresh);
	router.get("/me", requireAuth, userHandler.me);
	router.post("/logout", userHandler.logout);

	return router;
}
