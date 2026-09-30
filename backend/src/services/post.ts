import type { Post, NewPost } from "../domain/post/entity.js"
import type { PostReposityry } from "../domain/post/repository.js"
import type { PostSevice } from "./types.js"


export function createPostService(postRepository: PostReposityry): PostSevice {

    return {
        getAll(category, take){
            return postRepository.getAll(category, take)
        },
        
        getById(id){
            return postRepository.getById(id)
        },
        
        addPost(post){
            return postRepository.addPost(post)
        }
    }
}