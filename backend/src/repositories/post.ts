import type { Post, createPostDto } from "../transport/dto/post/responses.js"


const posts: Post[] = [
    {
        id: 0,
        title: "My day",
        content: "Good day, today",
        author: "Egor",
        category: "Lifestyle"
    }
]


export async function getAll(category?: string, take?: number): Promise<Post[]>{
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
}

export async function getById(id: number): Promise<Post>{
    return new Promise((resolve, reject) => {
        const post = posts.find((obj) => obj.id === id)

        if (!post) return reject("Post no found")
        resolve(post)
    })
}

export async function addPost(post: createPostDto): Promise<Post>{
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

