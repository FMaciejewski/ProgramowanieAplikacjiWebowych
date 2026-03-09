import {useQuery} from "@tanstack/react-query";
import type {komentarz} from "../../api/node_modules/.prisma/client";

const getComments = async(id: number) => {
    return await fetch(`http://localhost:3000/comments/get/wpis/${id}`)
        .then(response => response.json())
}

export const useComments = (id: number) => {
    return useQuery<komentarz[]>({
        queryKey: ['comments'],
        queryFn: () => getComments(id)
    })
}