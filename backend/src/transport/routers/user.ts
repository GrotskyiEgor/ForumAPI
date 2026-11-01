import { Router } from "express"
import type { UserHandlers } from "../handlers/user/types"

export function createUserRouter(userHandler: UserHandlers): Router {
    const router: Router = Router()

    router.post("/login", userHandler.loginUser)
    router.post("/register", userHandler.registerUser)
    router.post("/refresh", userHandler.refresh)

    return router
}