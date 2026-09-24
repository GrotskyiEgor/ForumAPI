import type { Post } from '../../types/post.ts';

async function getPosts(): Promise<Post[]> {
    const res = await fetch('http://localhost:3001/posts', { cache: 'no-store' });

    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div style={{ padding: 40 }}>
        <h1>Посты форума</h1>
        <hr /><br />
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <br /><hr />

                    <strong>{post.title}</strong>
                    <p>{post.content}</p>
                    <p>{post.author}</p>
                    <p>{post.category}</p>

                    <hr /><br />
                </li>
            ))}
        </ul>
        </div>
    );
}