import { type RequestHandler, Router } from "express";

import type { PostHandlers } from "../handlers/post/types.js";

export function createPostRouter(
	postHandler: PostHandlers,
	requireAuth: RequestHandler,
): Router {
	const router: Router = Router();

	router.get("/all", postHandler.getAll);
	router.get("/:id", postHandler.getById);
	router.post("/create", requireAuth, postHandler.addPost);

	return router;
}
