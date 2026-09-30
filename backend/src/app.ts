import express, { type Express } from "express"

import { createPostRepository } from "./repositories/post.js"
import { createPostService } from "./services/post.js"
import { createPostHandlers } from "./transport/handlers/post.js"
import { createPostRouter } from "./transport/routers/post.js"

const HOST: string = "localhost"
const PORT: number = 3001

const postRepository = createPostRepository()
const postService = createPostService(postRepository)
const postHandlers = createPostHandlers(postService)
const postRouter = createPostRouter(postHandlers)

const app: Express = express()

app.use(express.json())
app.use(postRouter)
app.use(express.static("public"))

app.listen(PORT, HOST, () => {
    console.log(`Start server http://${HOST}:${PORT}`)
})