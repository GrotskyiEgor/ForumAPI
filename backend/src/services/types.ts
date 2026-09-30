import type { Post, NewPost } from "../domain/post/entity.js"

export interface PostSevice {
    getAll(category?: string, take?: number): Promise<Post[]>;
    getById(id: number): Promise<Post>;
    addPost(post: NewPost): Promise<Post>; 
}