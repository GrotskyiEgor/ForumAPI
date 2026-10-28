export interface Post {
    id: number;
    userId: number;
    title: string;
    author: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface createPostDto {
    title: string,
    description: string,
    author: string,
    category: string    
}
