import type { Post } from "../../types/proudct"
import PostCard from "./posts"

type PostListProps = {
    posts: Post[]
}

function PostList({ posts }: PostListProps) {
    if (posts.length === 0) {
        return <p className="post-empty">Постов пока нет</p>
    }

    return (
        <div className="post-dev-list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    )
}

export default PostList