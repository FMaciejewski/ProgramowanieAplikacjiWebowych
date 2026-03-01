import {useQuery} from "@tanstack/react-query";
import type {Comment} from "../components/Comment.ts";

const getComments = async(id: number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
}

export const useComments = (id: number) => {
    return useQuery<Comment[]>({
        queryKey: ['comments'],
        queryFn: () => getComments(id)
    })
}