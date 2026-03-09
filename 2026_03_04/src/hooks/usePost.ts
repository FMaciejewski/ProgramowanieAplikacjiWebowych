import {useQuery} from "@tanstack/react-query";
import type {wpis} from "../../api/node_modules/.prisma/client";

const getPosts = async() => {
    return await fetch('http://localhost:3000/posts/get')
        .then(response => response.json())
}

export const usePosts = () => {
    return useQuery<wpis[]>({
        queryKey: ['posts'],
        queryFn: getPosts
    })
}

const getPost = async(id: number) => {
    return await fetch(`http://localhost:3000/posts/get/${id}`)
        .then(response => response.json())
}

export const usePost = (id: number) => {
    return useQuery<wpis>({
        queryKey: ['post'],
        queryFn: () => getPost(id)
    })
}