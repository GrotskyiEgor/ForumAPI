import type { Post, NewPost } from "../domain/post/entity.js";
import type { PostReposityry } from "../domain/post/repository.js";
import { db } from "../prisma/db";

export function createPostRepository(): PostReposityry {
    return {
        async getAll(category, take) {
            let posts = await db.orm.public.Post.all();

            if (category !== undefined) {
                posts = posts.filter(
                    (post) => post.category === category
                );
            }

            if (take !== undefined) {
                posts = posts.slice(0, Number(take));
            }

            return posts;
        },

        async getById(id) {
            const post = await db.orm.public.Post.where({ id }).first();

            if (!post) {
                throw new Error("Post not found");
            }

            return post;
        },

        async addPost(post: NewPost) {
            const newPost = await db.orm.public.Post.create({
                ...post,
                userId: 1,
            });

            return newPost;
        },
    };
}