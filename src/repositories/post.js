const posts = [
    {
        id: 0,
        title: "My day",
        content: "Good day, today",
        author: "Egor",
        category: "Lifestyle"
    }
]


export async function getAll(category, take){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let filterPosts = [...posts]

            if (category) {
                filterPosts = filterPosts.filter((obj) => obj.category === category)
            }

            if (take) {
                filterPosts = filterPosts.slice(0, Number(take))
            }   

            resolve(filterPosts)
        }, 1000)
    })
}

export async function getById(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = posts.find((obj) => obj.id === id)

            if (!post) return reject("error")
            resolve(post)
        }, 1000)
    })
}

export async function addPost(title, content, author, category){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newPost = {
                id: posts.length,
                title: title,
                content: content,
                author: author,
                category: category
            }

            posts.push(newPost)
            resolve(newPost)
        }, 1000)
    })
}

