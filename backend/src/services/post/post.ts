import type { PostSevice } from "./types.js"
import type { PostReposityry } from "../../domain/post/repository.js"
import { PostNotFoundError, InvalidUserIdError, PostAllFieldsRequiredError } from "../../transport/dto/post/errors.js"
import { UserNotFoundError } from "../../transport/dto/user/errors.js"



export function createPostService(postRepository: PostReposityry): PostSevice {

    return {
        async getAll(category, take){
            return { success: true, data: await postRepository.getAll(category, take)}
        },
        
        async getById(id){
            const post = await postRepository.getById(id)

            if (!post) {
                return { success: false, error: new PostNotFoundError()}
            }

            return { success: true, data: post}
        },
        
        async addPost(post, userId){
            if (!Number.isSafeInteger(userId) || userId <= 0) {
                return { success: false, error: new InvalidUserIdError()}
            }

            if ( !post.title?.trim() || !post.description?.trim() || !post.category?.trim()) {
                return { success: false, error: new PostAllFieldsRequiredError()}
            }

            const newPost = await postRepository.addPost(post, userId)

            if (!newPost) {
                return { success: false, error: new UserNotFoundError()}
            }

            return { success: true, data: newPost}
        }
    }
}