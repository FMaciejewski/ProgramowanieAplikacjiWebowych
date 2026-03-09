import {useComments} from "../hooks/useComment.ts";
import {useParams} from "react-router";
import type {komentarz} from "../../api/node_modules/.prisma/client";
import {useState} from "react";

export default function CommentSection() {
    const params = useParams();
    const id = Number(params.id);

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");

    const {data: comments, isLoading, isError, refetch} = useComments(id)

    async function addComment(e: React.FormEvent) {
        e.preventDefault();

        await fetch("http://localhost:3000/comments/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uzytkownik: "Jan Kowalski",
                tytul: title,
                opis: content,
                wpisID: id,
            })
        });

        setTitle("");
        setContent("");
        refetch();
    }

    return(
        <div className={"CommentSection"}>
            <form className={"AddComment"} onSubmit={addComment}>
                <input
                    type={"text"}
                    placeholder={"Tytuł"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder={"Opis komentarza"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <input
                    type={"submit"}
                    value={"Dodaj komentarz"}
                />
            </form>

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
                    {comments.map((c: komentarz) => (
                        <div className={"Comment"} key={c.ID}>
                            <h5 className={"commentCreator"}>
                                {c.uzytkownik}
                            </h5>
                            <h4 className={"commentTitle"}>
                                {c.tytul}
                            </h4>
                            <p className={"commentBody"}>
                                {c.opis}
                            </p>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}