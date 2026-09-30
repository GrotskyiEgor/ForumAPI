import type { Request, Response } from "express"

import type { Post, createPostDto, ErrorResponse } from "../dto/post/responses.js"

export interface PostHandlers {
    getAll(req: Request<{}, {}, {}, { category?: string, take?: number }>, res: Response<Post[]>): Promise<Response<Post[]>>;
    getById(req: Request, res: Response<Post | ErrorResponse>): Promise<Response<Post | ErrorResponse>>;
    addPost(req: Request<{}, {}, createPostDto>, res: Response<Post | ErrorResponse>): Promise<Response<Post | ErrorResponse>>;
}