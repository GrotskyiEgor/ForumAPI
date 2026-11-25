import type { PostHandlers } from "./types.js";

import type { PostSevice } from "../../../services/post/types.js";
import type { NewPost } from "../../../domain/post/entity.js";

export function createPostHandlers(postService: PostSevice): PostHandlers {
	return {
		async getAll(req, res) {
			const { category, take } = req.query;
			const result = await postService.getAll(category, take);

			return res.status(200).json(result.data);
		},

		async getById(req, res) {
			const { id } = req.params;
			const postId = Number(id);

			try {
				const result = await postService.getById(postId);

				if (!result.success) {
					console.log(result.error.message);
					return res
						.status(404)
						.json({ error: result.error.message });
				}

				return res.status(200).json(result.data);
			} catch (error) {
				console.log(error);

				return res.status(500).json({
					error: "Server error",
				});
			}
		},

		async addPost(req, res) {
			const { title, description, category } = req.body;

			try {
				const userId = res.locals.userId;

				const createPost: NewPost = {
					title,
					description,
					category,
				};

				if (userId === undefined) {
					return res.status(401).json({ error: "Unauthorized" });
				}

				const result = await postService.addPost(createPost, userId);

				if (!result.success) {
					const message = result.error.message;

					if (result.error.name === "InvalidUserIdError") {
						return res.status(401).json({ error: message });
					}

					if (result.error.name === "PostAllFieldsRequiredError") {
						return res.status(400).json({ error: message });
					}

					return res
						.status(500)
						.json({ error: "Internal server error" });
				}

				return res.status(201).json(result.data);
			} catch (error) {
				console.log(error);

				return res.status(500).json({
					error: "Server error",
				});
			}
		},
	};
}
