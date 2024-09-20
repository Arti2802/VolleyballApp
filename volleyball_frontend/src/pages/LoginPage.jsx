import React from "react";
// import axios from "axios";
// import { ApiURL } from "../ApiURL";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        })
    }

    const handleLogin = async() => {
        try {
            sessionStorage.setItem('log', 'true');
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="my-5 p-2 position-absolute bg-body-secondary rounded-1" style={{width: '300px', height: '300px', left: '40%'}}>
            <h2 className="text-center my-3">Logowanie</h2>
            <form className="group" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Nazwa użytkownika</label>
                    <input name="username" className="form-control" onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label>Hasło</label>
                    <input name="password" className="form-control" type="password" onChange={handleChange} required/>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
            </form>
        </div>
    )
}