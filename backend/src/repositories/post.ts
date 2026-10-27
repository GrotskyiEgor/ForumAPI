import type { Post, NewPost } from "../domain/post/entity.js"
import type { PostReposityry } from "../domain/post/repository.js"

export function createPostRepository(): PostReposityry {
    const posts: Post[] = [
        {
            id: 0,
            userId: 1,
            title: "My day",
            author: "Egor",
            description: "Good day, today. Sharing my daily routine and positive lifestyle thoughts.",
            category: "Lifestyle",
            createdAt: "2026-10-27T08:00:00.000Z",
            updatedAt: "2026-10-27T08:00:00.000Z"
        },
        {
            id: 1,
            userId: 2,
            title: "Getting Started with TypeScript",
            author: "Anna",
            description: "A comprehensive guide for beginners looking to learn strong typing in JavaScript.",
            category: "Development",

            createdAt: "2026-10-27T09:15:00.000Z",
            updatedAt: "2026-10-27T10:00:00.000Z"
        },
        {
            id: 2,
            userId: 1,
            title: "My Favorite Vite Configs",
            author: "Egor",
            description: "How to properly set up custom ports, open options, and reverse proxy for development.",
            category: "Tools",
            createdAt: "2026-10-27T11:30:00.000Z",
            updatedAt: "2026-10-27T11:30:00.000Z"
        },
        {
            id: 3,
            userId: 3,
            title: "Exploring Express 5 features",
            author: "Dmitry",
            description: "Deep dive into the latest changes in Express routing and improved async error handling.",
            category: "Backend",
            createdAt: "2026-10-27T12:00:00.000Z",
            updatedAt: "2026-10-27T12:45:00.000Z"
        },
        {
            id: 4,
            userId: 2,
            title: "Understanding React 19 Updates",
            author: "Anna",
            description: "An overview of Server Actions, the new use() hook, and document metadata support.",
            category: "Frontend",
            createdAt: "2026-10-27T13:00:00.000Z",
            updatedAt: "2026-10-27T13:00:00.000Z"
        },
        {
            id: 5,
            userId: 4,
            title: "Redux Toolkit Best Practices",
            author: "Maxim",
            description: "How to structure api slices, organize state, and handle loading indicators cleanly.",
            category: "Frontend",
            createdAt: "2026-10-27T14:20:00.000Z",
            updatedAt: "2026-10-27T15:10:00.000Z"
        },
        {
            id: 6,
            userId: 1,
            title: "Fixing CORS once and for all",
            author: "Egor",
            description: "Quick tutorial on implementing cross-origin resource sharing headers in Node apps.",
            category: "Backend",
            createdAt: "2026-10-27T15:30:00.000Z",
            updatedAt: "2026-10-27T15:30:00.000Z"
        },
        {
            id: 7,
            userId: 3,
            title: "Why key prop matters in React",
            author: "Dmitry",
            description: "Explaining the virtual DOM diffing algorithm and why stable IDs prevent UI bugs.",
            category: "Frontend",
            createdAt: "2026-10-27T16:40:00.000Z",
            updatedAt: "2026-10-27T17:00:00.000Z"
        },
        {
            id: 8,
            userId: 5,
            title: "Styling layout containers with CSS Grid",
            author: "Elena",
            description: "Modern layout techniques using grid template areas for highly flexible web structures.",
            category: "Design",
            createdAt: "2026-10-27T17:15:00.000Z",
            updatedAt: "2026-10-27T17:15:00.000Z"
        },
        {
            id: 9,
            userId: 4,
            title: "Fullstack project architecture",
            author: "Maxim",
            description: "Tips on folder organization when managing frontend and forum-api in a single workspace.",
            category: "Architecture",
            createdAt: "2026-10-27T18:00:00.000Z",
            updatedAt: "2026-10-27T19:30:00.000Z"
        }
    ];
        
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

