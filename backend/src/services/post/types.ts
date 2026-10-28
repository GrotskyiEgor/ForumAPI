import type { NewPost } from "../../domain/post/entity.js"
import type { AddPostResponse, GetAllPostResponse, GetPostByIdResponse } from "../../transport/dto/post/responses.js";

export interface PostSevice {
    getAll(category?: string, take?: number): Promise<GetAllPostResponse>;
    getById(id: number): Promise<GetPostByIdResponse>;
    addPost(post: NewPost, userId: number): Promise<AddPostResponse>; 
}

