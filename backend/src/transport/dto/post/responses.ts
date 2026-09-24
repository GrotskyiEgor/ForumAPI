export interface Post {
    id: number,
    title: string,
    content: string,
    author: string,
    category: string    
}

export interface createPostDto {
    title: string,
    content: string,
    author: string,
    category: string    
}

export interface ErrorResponse {
    message: string
}