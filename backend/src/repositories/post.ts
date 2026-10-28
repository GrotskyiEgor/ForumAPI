import type { Post, NewPost } from "../domain/post/entity.js";
import type { PostReposityry } from "../domain/post/repository.js";
import type { UserRepository } from "../domain/user/repository.js";
import { db } from "../prisma/db";

export function createPostRepository(userRepository: UserRepository): PostReposityry {
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
                return undefined
            }

            return post;
        },

        async addPost(post, userId) {
            const user = await userRepository.getUserById(userId)

            if (!user) {
                return undefined
            }

            const newPost = await db.orm.public.Post.create({
                ...post,
                author: user.name,
                userId: user.id,
            });

            return newPost;
        },
    }
}