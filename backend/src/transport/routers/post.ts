import { Router } from "express"

import type { PostHandlers } from "../handlers/post/types.js"
import { authMiddleware } from "../../lib/jwt.js";


export function createPostRouter(postHandler: PostHandlers): Router {
    const router: Router = Router();
    
    router.get("/posts", postHandler.getAll);
    router.get("/posts/:id", postHandler.getById);
    router.post("/posts", authMiddleware, postHandler.addPost);
    
    return router;
}
