import {useQuery} from "@tanstack/react-query";
import type {Post} from "../components/Post.ts";

const getPosts = async() => {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
}

export const usePosts = () => {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}

const getPost = async(id: number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
}

export const usePost = (id: number) => {
    return useQuery<Post>({
        queryKey: ['post'],
        queryFn: () => getPost(id)
    })
}