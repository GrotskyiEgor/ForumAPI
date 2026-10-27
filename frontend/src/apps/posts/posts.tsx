import type { Post } from "../../types/proudct"

type PostCardProps = {
    post: Post
}

function PostCard({post}: PostCardProps) {
  return (
    <div className="post-main">
        <div className="post-head">
            <p>{post.title}</p>
            <p>{post.author}</p>
        </div>

        <p>{post.description}</p>
    </div>
  )
}

export default PostCard
