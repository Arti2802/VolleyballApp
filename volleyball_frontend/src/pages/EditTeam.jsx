import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export const EditTeam = () => {
    const { pk } = useParams();
    const navigate = useNavigate();

    const [team, setTeam] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/teams/${pk}/`)
        .then((response) => {
            console.log(response.data);
            setTeam(response.data);
        })
    }, [pk])
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
    const handleEdit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiURL}/teams/`, team);
            if (response.status === 201)
            {
                alert('Udało się edytować drużynę');
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
            <h1>Edytuj drużynę</h1>
            <form className="group" onSubmit={handleEdit}>
                <div className="mb-3">
                    <label>Państwo</label>
                    <select name="country" className="form-select" defaultValue={"" && team.contry.codes} onChange={handleChange}>
                        <option disabled value={""} key={0}>Wybierz opcję</option>
                        {countries.length > 0 ? (
                            countries.map((country, index) => (
                                <option value={country.code} key={index}>{country.display_name}</option>
                            ))
                        ) : null}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Nazwa</label>
                    <input name="name" className="form-control" value={team.name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Data założenia</label>
                    <input name="creation_date" className="form-control" value={team.creation_date} type="date" onChange={handleChange}/>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
            </form>
        </>
    )
}