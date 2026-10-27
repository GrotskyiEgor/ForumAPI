import type { Post } from "../types/proudct"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001"
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => "/posts"
        })
    })
})

export const { useGetPostsQuery } = baseApi