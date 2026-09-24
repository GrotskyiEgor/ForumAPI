import  { type Request, type Response } from "express"

import * as postServices from "../../services/post.js"
import type { Post, createPostDto, ErrorResponse} from "../dto/post/responses.js"


export async function getAll(req: Request<{}, {}, {}, {category?: string, take?: number}>, res: Response){
    const { category, take } = req.query
    const posts = await postServices.getAll(category, take)

    return res.status(200).json(posts)
}

export async function getById(req: Request, res: Response< Post | ErrorResponse>){
    const { id } = req.params
    const postId = Number(id)
    
    try {
        const post: Post = await postServices.getById(postId)

        return res.status(200).json(post)
    } catch (error) {
        console.log(error)

        return res.status(404).json({
            message: "Post not found"
        })
    }
}

export async function addPost(req: Request<{}, {}, createPostDto>, res: Response< Post | ErrorResponse>){
    const { title, content, author, category } = req.body

    try {
        const createPost: createPostDto = {
                title, 
                content, 
                author, 
                category
            }

        const newPost: Post = await postServices.addPost(createPost)
            
        return res.status(201).json(newPost)
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            message: "Post not created"
        })
    }
}