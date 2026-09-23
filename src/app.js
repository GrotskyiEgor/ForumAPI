import express from "express"

import postRouter from "./routers/post.js"


const HOST = "localhost"
const PORT = 3010

const app = express()

app.use(express.json())
app.use(postRouter)

app.listen(PORT, HOST, () => {
    console.log(`Start server http://${HOST}:${PORT}`)
})