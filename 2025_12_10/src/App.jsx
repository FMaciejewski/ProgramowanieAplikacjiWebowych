import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import Home from "./Sites/Home.jsx";
import Text from "./Sites/Text.jsx";
import Kontakt from "./Sites/Kontakt.jsx";
import Onas from "./Sites/Onas.jsx";
import Navigation from "./Sites/Navigation.jsx";

function App() {

  return (
    <>
    <h1>Stronka Stronka</h1>
    <BrowserRouter>
        <Navigation />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/text" element={<Text />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/onas" element={<Onas />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
