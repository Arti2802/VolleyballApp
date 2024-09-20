import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const AddCompetition = () => {
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({});

    const handleChange = (e) => {
        const value = e.target.value;
        setCompetition({
            ...competition,
            [e.target.name]: value
        })
    }
    const handleAdd = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiURL}/competitions/`, competition);
            if (response.status === 201)
            {
                alert('Udało się dodać zawody');
                navigate('/zawody');
            }
        }
        catch (err) {
            console.log(err);
            alert(err);
        }
    }
    return (
        <>
           <h1>Dodaj zawody</h1>
           <form className="group" onSubmit={handleAdd}>
                <div className="mb-3">
                    <label htmlFor="name">Nazwa</label>
                    <input className="form-control" name="name" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Data rozpoczęcia</label>
                    <input className="form-control" type="datetime-local" name="date_start" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Data zakończenia</label>
                    <input className="form-control" type="datetime-local" name="date_stop" onChange={handleChange}/>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
           </form>
        </>
    )
}