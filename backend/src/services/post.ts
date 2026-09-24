import * as postRepository from "../repositories/post.js"

import type { Post, createPostDto } from "../transport/dto/post/responses.js"


export function getAll(category?: string, take?: number){
    return postRepository.getAll(category, take)
}

export function getById(id: number){
    return postRepository.getById(id)
}

export function addPost(post: createPostDto): Promise<Post>{
    return postRepository.addPost(post)
}