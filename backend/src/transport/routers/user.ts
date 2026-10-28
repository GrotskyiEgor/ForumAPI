import { Router } from "express"
import type { UserHandlers } from "../handlers/user/types"

export function createUserRouter(userHandler: UserHandlers): Router {
    const router: Router = Router()

    router.post("/auth/login", userHandler.loginUser)
    router.post("/auth/register", userHandler.registerUser)

    return router
}