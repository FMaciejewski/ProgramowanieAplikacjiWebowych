import "./Posts.scss"
import type {Post} from "../components/Post.ts"
import {Link} from "react-router";
import {usePosts} from "../hooks/usePost.ts";

export default function Posts(){
    const {data: posts, isLoading, isError} = usePosts()

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
                {!isLoading && !isError && posts && (
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