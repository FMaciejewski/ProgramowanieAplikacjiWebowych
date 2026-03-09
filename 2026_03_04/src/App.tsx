import "./App.scss"
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./sites/Home.jsx";
import Posts from "./sites/Posts.jsx";
import Categories from "./sites/Categories.jsx";
import PostDetail from "./sites/PostDetail.jsx";

function App() {

    return (
        <>
            <nav>
                <a href="/">Strona Główna</a>
                <a href="/posts">Posty</a>
                <a href="/categories">Kategorie</a>
            </nav>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path="/posts" element={<Posts />}/>
                    <Route path="/categories" element={<Categories />}/>
                    <Route path="/posts/:id" element={<PostDetail />}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
