export interface User{
    id: number
    name: string
    email: string
    password: string
    createdAt: string
}

export type UserRegistrate = Omit<User, "id" | "createdAt">

export type UserLogin = Pick<User, "email" | "password">