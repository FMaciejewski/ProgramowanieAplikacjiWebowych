import {NavLink} from "react-router";

export default function Navigation(){
    return (
        <nav>
            <NavLink to="/">Strona Główna </NavLink>
            <NavLink to="/text">Text </NavLink>
            <NavLink to="/kontakt">Kontakt </NavLink>
            <NavLink to="/onas">Onas </NavLink>
        </nav>
    )
}