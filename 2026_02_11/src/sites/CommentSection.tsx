import {useComments} from "../hooks/useComment.ts";
import {useParams} from "react-router";
import type {Comment} from "../components/Comment.ts";

export default function CommentSection() {
    const params = useParams();
    const id = Number(params.id);

    const {data: comments, isLoading, isError} = useComments(id)

    return(
        <div className={"CommentSection"}>
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
                    Wystąpił błąd w wczytywaniu komentarzy
                </div>
            )}
            {!isError && !isLoading && comments && (
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
        )
}