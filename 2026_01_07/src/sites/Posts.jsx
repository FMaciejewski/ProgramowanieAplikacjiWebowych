import "./Posts.scss"

export default function Posts(){
    return(
        <>
            <div className={"PostContainer"}>
                <h3>Post 1</h3>
                <p>Pograłem sobie dziś trochę</p>
            </div>
            <div className={"PostContainer"}>
                <h3>Post 2</h3>
                <p>Tutorial na pro tricki na desce</p>
            </div>
            <div className={"PostContainer"}>
                <h3>Post 3</h3>
                <p>Ale mróz</p>
            </div>
        </>
    )
}