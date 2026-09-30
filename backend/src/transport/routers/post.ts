import { Router } from "express";

import type { PostHandlers } from "../handlers/post.js"


export function createPostRouter(postHandler: PostHandlers): Router {
    const router: Router = Router();
    
    router.get("/posts", postHandler.getAll);
    router.get("/posts/:id", postHandler.getById);
    router.post("/posts", postHandler.addPost);
    
    return router;
}
