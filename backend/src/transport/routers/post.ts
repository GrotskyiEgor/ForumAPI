import { Router } from "express"

import type { PostHandlers } from "../handlers/post/types.js"
import { authMiddleware } from "../../lib/jwt.js";


export function createPostRouter(postHandler: PostHandlers): Router {
    const router: Router = Router()
    
    router.get("/all", postHandler.getAll)
    router.get("/:id", postHandler.getById)
    router.post("/create", authMiddleware, postHandler.addPost)
    
    return router
}
