import "./Posts.scss"
import type {Post} from "../components/Post.ts"
import {useEffect, useState} from "react";
import {Link} from "react-router";

export default function Posts(){
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        (() => {
            setIsLoading(true)
        })()
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((json: Post[]) => {
                setPosts(json)
            })
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    return(
        <>
            <div className={"PostGrid"}>
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
                        {posts.length == 0 && (
                            <div className={"Error"}>
                                Brak postów do wyświetlenia
                            </div>
                        )}
                        {posts.map((p: Post) => (
                                <div className={"PostContainer"} key={p.id}>
                                    <h4 className={"PostTitle"}>
                                        {p.title.substring(0, 20)}...
                                    </h4>
                                    <p>
                                        {p.body.substring(0, 50)}...
                                    </p>
                                    <Link className={"PostLink"} to={p.id.toString()}>
                                        Przejdź do wpisu
                                    </Link>
                                </div>
                            )
                        )}
                    </>
                )}
            </div>
        </>
    )
}