import cors from 'cors'
import express, { type Express } from "express"
import cookieParser from "cookie-parser";

import { createUserRepository } from "./repositories/user.js"
import { createUserService } from "./services/user/user.js"
import { createUserHandlers } from "./transport/handlers/user/user.js"
import { createUserRouter } from "./transport/routers/user.js"

import { createPostRepository } from "./repositories/post.js"
import { createPostService } from "./services/post/post.js"
import { createPostHandlers } from "./transport/handlers/post/post.js"
import { createPostRouter } from "./transport/routers/post.js"


const HOST: string = "localhost"
const PORT: number = 3001
const app: Express = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser());

const userRepository = createUserRepository()
const userService = createUserService(userRepository)
const userHandlers = createUserHandlers(userService)
const userRouter = createUserRouter(userHandlers)

const postRepository = createPostRepository(userRepository)
const postService = createPostService(postRepository)
const postHandlers = createPostHandlers(postService)
const postRouter = createPostRouter(postHandlers)

app.use(userRouter)
app.use(postRouter)
app.use(express.static("public"))


app.listen(PORT, HOST, () => {
    console.log(`Start server http://${HOST}:${PORT}`)
})