import * as postRepository from "../repositories/post.js"


export function getAll(category, take){
    return postRepository.getAll(category, take)
}

export function getById(id){
    return postRepository.getById(id)
}

export function addPost(title, content, author, category){
    return postRepository.addPost(title, content, author, category)
}