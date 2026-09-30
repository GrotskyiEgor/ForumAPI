import type { Post, NewPost } from "../domain/post/entity.js"
import type { PostReposityry } from "../domain/post/repository.js"

export function createPostRepository(): PostReposityry {
    const posts: Post[] = [
        {
            id: 0,
            title: "My day",
            content: "Good day, today",
            author: "Egor",
            category: "Lifestyle"
        }
    ]
    
    return {
        async getAll(category, take){
            return new Promise((resolve, reject) => {
                let filterPosts: Post[] = [...posts]
        
                if (category !== undefined) {
                    filterPosts = filterPosts.filter((obj) => obj.category === category)
                }
        
                if (take !== undefined) {
                    filterPosts = filterPosts.slice(0, Number(take))
                }   
        
                resolve(filterPosts)
            })
        },
        
        async getById(id){
            return new Promise((resolve, reject) => {
                const post = posts.find((obj) => obj.id === id)
        
                if (!post) return reject("Post no found")
                resolve(post)
            })
        },
        
        async addPost(post){
            return new Promise((resolve, reject) => {
                const newPost: Post = {
                    id: posts.length,
                    title: post.title,
                    content: post.content,
                    author: post.author,
                    category: post.category
                }
        
                posts.push(newPost)
                resolve(newPost)
            })
        }
    }
}    

