import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AddTeam = () => {
    const navigate = useNavigate();

    const [team, setTeam] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.options(`${ApiURL}/teams/1/`)
        .then((response) => {
            console.log(response);
            setCountries(response.data.actions.PUT.country.choices);
        })
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setTeam({
            ...team,
            [e.target.name]: value
        })
    }
    const handleAdd = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiURL}/teams/`, team);
            if (response.status === 201)
            {
                alert('Udało się dodać drużynę');
                navigate('/druzyny');
            }
        }
        catch (err) {
            console.log(err);
            alert(err);
            console.log(team);
        }

    }
    return (
        <>
            <h1>Dodaj drużynę</h1>
            <form className="group" onSubmit={handleAdd}>
                <div className="mb-3">
                    <label htmlFor="country">Państwo</label>
                    <select name="country" className="form-select" defaultValue={""} onChange={handleChange}>
                        <option disabled value={""} key={"12"}>Wybierz opcję</option>
                        {countries.length > 0 ? (
                            countries.map((country, index) => (
                                <option value={country.code} key={index}>{country.display_name}</option>
                            ))
                        ) : null}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name">Nazwa</label>
                    <input name="name" className="form-control" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="creation_date">Data założenia</label>
                    <input name="creation_date" className="form-control" type="date" onChange={handleChange}/>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
            </form>
        </>
    )
}