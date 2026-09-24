import express, { type Express } from "express"

import postRouter from "./transport/routers/post.js"


const HOST: string = "localhost"
const PORT: number = 3001

const app: Express = express()

app.use(express.json())
app.use(postRouter)
app.use(express.static("public"))

app.listen(PORT, HOST, () => {
    console.log(`Start server http://${HOST}:${PORT}`)
})