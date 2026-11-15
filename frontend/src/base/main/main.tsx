import PostList from "../../apps/posts/postList"
import type { Post } from "../../types/proudct"

type MainProps = {
    posts: Post[]
}

function Main({ posts }: MainProps) {
    return (
        <main>
            <div className="main-panel">
                <h1>Добрый день</h1>
                <p>Добрый день еще раз</p>
            </div>

            <PostList posts={posts} />
        </main>
    )
}

export default Main