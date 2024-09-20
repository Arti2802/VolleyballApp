import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export const EditCompetition = () => {
    const { pk } = useParams();
    const navigate = useNavigate();
    const [competition, setCompetition] = useState({});

    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}`)
        .then((response) => {
            console.log(response);
            setCompetition(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])

    const handleChange = (e) => {
        const value = e.target.value;
        setCompetition({
            ...competition,
            [e.target.name]: value
        })
    }
    const changeDate = (date) => {
        return date && (date.substring(0, 10) + ' ' + date.substring(11, 16));
    }
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${ApiURL}/competitions/${pk}/`, competition);
            if (response.status === 200)
            {
                alert('Udało się edytować zawody');
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
           <h1>Edytuj zawody</h1>
           <form className="group" onSubmit={handleEdit}>
                <div className="mb-3">
                    <label htmlFor="name">Nazwa</label>
                    <input className="form-control" name="name" value={competition.name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Data rozpoczęcia</label>
                    <input className="form-control" type="datetime-local" name="date_start" value={changeDate(competition.date_start)} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Data zakończenia</label>
                    <input className="form-control" type="datetime-local" name="date_stop" value={changeDate(competition.date_stop)} onChange={handleChange}/>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
           </form>
        </>
    )
}