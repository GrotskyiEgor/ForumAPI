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

export interface NewPost {
    title: string,
    content: string,
    author: string,
    category: string
}