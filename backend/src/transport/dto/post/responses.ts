import type { Post } from "./requests.js"
import type { InvalidUserIdError, PostAllFieldsRequiredError, PostNotFoundError } from "./errors.js"
import type { UserNotFoundError } from "../user/errors.js"

export type GetAllPostResponse = {success: true, data: Post[]}
export type GetPostByIdResponse = {success: true, data: Post} | {success: false, error: PostNotFoundError}
export type AddPostResponse = {success: true, data: Post} | {success: false, error: InvalidUserIdError | PostAllFieldsRequiredError | UserNotFoundError}