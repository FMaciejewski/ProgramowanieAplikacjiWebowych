import "./PostDetail.scss"
import {useParams} from "react-router";
import {usePost} from "../hooks/usePost.ts";
import CommentSection from "./CommentSection.tsx";

export default function PostDetail() {
    const params = useParams();
    const id = Number(params.id);

    const {data: post, isLoading, isError} = usePost(id);

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
                            <CommentSection/>
                        </>
                    </>

                )}
            </div>
        </>
    )
}