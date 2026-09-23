import * as postServices from "../services/post.js"


export async function getAll(req, res){
    const { category, take } = req.query
    const posts = await postServices.getAll(category, take)

    return res.status(200).json(posts)
}

export async function getById(req, res){
    const { id } = req.params
    const postId = Number(id)
    
    try {
        const post = await postServices.getById(postId)

        return res.status(200).json(post)
    } catch (error) {
        return res.status(404).json({
            message: "Post not found"
        })
    }
}

export async function addPost(req, res){
    const { title, content, author, category } = req.body
    const newPost = await postServices.addPost(title, content, author, category)

    return res.status(200).json(newPost)
}