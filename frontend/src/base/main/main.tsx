import PostCard from "../../apps/posts/posts";
import type { Post } from "../../types/proudct";

type MainProps = {
    posts: Post[]
}

function main({posts}: MainProps) {
    return (
        <main>
            <div className="main-panel">
                <h1>Добрый день</h1>
                <p>Добрый день еще раз</p>
            </div>

            <div className="post-dev-list">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>
        </main>
    )
}

export default main
