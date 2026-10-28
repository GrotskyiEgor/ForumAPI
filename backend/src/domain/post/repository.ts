import type {Post, NewPost } from "./entity.js"

export interface PostReposityry {
    getAll(category?: string, take?: number): Promise<Post[]>;
    getById(id: number): Promise<Post | undefined>;
    addPost(post: NewPost, userId: number): Promise<Post | undefined>;
}