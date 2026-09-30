import { type Request, type Response } from "express"

import type { PostSevice } from "../../services/types.js"
import type { Post, createPostDto, ErrorResponse } from "../dto/post/responses.js"


export function createPostHandlers(postService: PostSevice) {
    async function getAll(req: Request<{}, {}, {}, {category?: string, take?: number}>, res: Response){
        const { category, take } = req.query
        const posts = await postService.getAll(category, take)
    
        return res.status(200).json(posts)
    }
    
    async function getById(req: Request, res: Response< Post | ErrorResponse>){
        const { id } = req.params
        const postId = Number(id)
        
        try {
            const post: Post = await postService.getById(postId)
    
            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
    
            return res.status(404).json({
                message: "Post not found"
            })
        }
    }
    
    async function addPost(req: Request<{}, {}, createPostDto>, res: Response< Post | ErrorResponse>){
        const { title, content, author, category } = req.body
    
        try {
            const createPost: createPostDto = {
                    title, 
                    content, 
                    author, 
                    category
                }
    
            const newPost: Post = await postService.addPost(createPost)
                
            return res.status(201).json(newPost)
        } catch (error) {
            console.log(error)
    
            return res.status(400).json({
                message: "Post not created"
            })
        }
    }

    return { getAll, getById, addPost}
}

export type PostHandlers = ReturnType<typeof createPostHandlers>