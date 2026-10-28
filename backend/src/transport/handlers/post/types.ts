import type { Request, Response } from "express"

import type { createPostDto, Post } from "../../dto/post/requests";

export interface PostHandlers {
    getAll(req: Request<{}, {}, {}, { category?: string, take?: number }>, res: Response<Post[]>): Promise<Response<Post[]>>;
    getById(req: Request, res: Response<Post | { error: string}>): Promise<Response<Post | { error: string}>>;
    addPost(req: Request<{}, {}, createPostDto>, res: Response<Post | { error: string}>): Promise<Response<Post | { error: string}>>;
}