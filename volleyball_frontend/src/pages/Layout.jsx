import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../UserContext";


export const Layout = () => {
    const { loggedIn, handleLogOut } = useAuth();

    return (
        <>
            <nav className="navbar navbar-expand-sm justify-content-center border-bottom">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Strona główna</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/zawody">Zawody</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/mecze">Mecze</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/druzyny">Drużyny</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ranking">Ranking</a>
                    </li>
                    {loggedIn ? (
                        <li className="nav-item">
                            <button className="nav-link" onClick={handleLogOut}>Wyloguj się</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <a className="nav-link" href="/logowanie">Zaloguj się</a>
                        </li>
                    )}
                </ul> 
            </nav>
            <div className="d-flex justify-content-center">
            <div className="container mx-4 py-2">
                <Outlet/>
            </div>
            </div>
        </>
    )
}