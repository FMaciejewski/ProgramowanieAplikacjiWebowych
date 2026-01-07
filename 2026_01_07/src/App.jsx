import "./App.scss"
import {BrowserRouter, NavLink, Route, Routes} from "react-router";
import Home from "./sites/Home.jsx";
import Posts from "./sites/Posts.jsx";
import Categories from "./sites/Categories.jsx";


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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
