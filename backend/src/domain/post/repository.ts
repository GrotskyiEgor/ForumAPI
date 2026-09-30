import type {Post, NewPost } from "./entity.js"

export interface PostReposityry {
    getAll(category?: string, take?: number): Promise<Post[]>;
    getById(id: number): Promise<Post>;
    addPost(post: NewPost): Promise<Post>;
}