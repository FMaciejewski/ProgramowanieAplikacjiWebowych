import "./PostDetail.scss"
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {Post} from "../components/Post.ts";
import type {Comment} from "../components/Comment.ts";

export default function PostDetail() {
    const { id } = useParams<{id: string}>();

    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isComLoading, setIsComLoading] = useState(false);
    const [isComError, setIsComError] = useState(false);

    useEffect(() => {
        (() => {
            setIsLoading(true)
            setIsComLoading(true)
        })()
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then((json: Post) => {
            setPost(json);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
        .then((json: Comment[]) => {
            setComments(json);
        })
        .catch(() => {
            setIsComError(true);
        })
        .finally(() => {
            setIsComLoading(false);
        })
    }, [id])
    return(
        <>
            <div className={"postDetail"}>
                {isLoading && (
                    <div className={"Loading"}>
                        <div className={"Loader"}>
                            <div></div>
                        </div>
                        Trwa ładowanie...
                    </div>
                )}
                {isError && (
                    <div className={"Error"}>
                        Wystąpił nieoczekiwany błąd
                    </div>
                )}
                {!isLoading && !isError && (
                    <>
                        {!post && (
                            <div className={"Error"}>
                                Nie ma posta o takim id
                            </div>
                        )}
                        <>
                            <div className={"postCard"}>
                                <h1 className={"postTitle"}>
                                    {post?.title}
                                </h1>
                                <p className={"postBody"}>
                                    {post?.body}
                                </p>
                            </div>
                            <div className={"CommentSection"}>
                                {isComLoading && (
                                    <div className={"Loading"}>
                                        <div className={"Loader"}>
                                            <div></div>
                                        </div>
                                        Trwa ładowanie...
                                    </div>
                                )}
                                {isComError && (
                                    <div className={"Error"}>
                                        Wystąpił błąd w wczytywaniu komentarzy
                                    </div>
                                )}
                                {!isComError && !isComLoading && (
                                    <>
                                        {comments.length == 0 && (
                                            <div className={"Error"}>
                                                Nie ma jeszcze komentarzy
                                            </div>
                                        )}
                                        {comments.map((c: Comment) => (
                                            <div className={"Comment"} key={c.id}>
                                                <h5 className={"commentCreator"}>
                                                    {c.email}
                                                </h5>
                                                <h4 className={"commentTitle"}>
                                                    {c.name}
                                                </h4>
                                                <p className={"commentBody"}>
                                                    {c.body}
                                                </p>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </>
                    </>

                )}
            </div>
        </>
    )
}