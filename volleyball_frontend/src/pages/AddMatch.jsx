import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


 export const AddMatch = () => {
    const navigate = useNavigate();

    const [match, setMatch] = useState();
    const [teams, setTeams] = useState([]);
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/teams/`)
        .then((response) => {
            console.log(response);
            setTeams(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get(`${ApiURL}/competitions/`)
        .then((response) => {
            console.log(response);
            setCompetitions(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;
        setMatch({
            ...match,
            [e.target.name]: value
        })
        console.log(match);
    }
    const handleAdd = async(e) => {
        let points1 = 0;
        if (match.sets1 >= 3)
        {
            if (match.sets2 < 2)
            {
                points1 = 3
            }
            else 
            {
                points1 = 2
            }
        }
        else 
        {
            if (match.sets1 >= 2)
            {
                points1 = 1;
            }
        }
        let points2 = 3 - points1;
        setMatch({
            ...match,
            points1: points1,
            points2: points2
        })
        e.preventDefault();
        try {
            const match_data = {
                ...match,
                points1: points1,
                points2: points2,
            }
            const response = await axios.post(`${ApiURL}/matches/add/`, match_data);
            if (response.status === 201)
            {
                alert('Udało się dodać mecz');
                navigate('/mecze');
            }
        }
        catch (err) {
            console.log(err);
            alert(err);
            console.log(match);
        }

    }
    return (
        <>
            <h1>Dodaj mecz</h1>
            <form className="group" onSubmit={handleAdd}>
                <div className="mb-3">
                    <label>Drużyna 1</label>
                    <select name="team1" className="form-select" defaultValue={""} onChange={handleChange} required>
                        <option disabled value="">Wybierz opcję</option>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))
                        ): (
                            <option disabled={true}>Brak opcji</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Drużyna 2</label>
                    <select name="team2" className="form-select" defaultValue={""} onChange={handleChange} required>
                        <option disabled value="">Wybierz opcję</option>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <option value={team.id} key={team.id}>{team.name}</option>
                            ))
                        ): (
                            <option disabled={true}>Brak opcji</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Data</label>
                    <input name="date" className="form-control" type="datetime-local" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Sety drużyny 1</label>
                    <input name="sets1" className="form-control" type="number" min={0} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Sety drużyny 2</label>
                    <input name="sets2" className="form-control" type="number" min={0} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label>Zawody</label>
                    <select name="competition" className="form-select" defaultValue={""} onChange={handleChange}>
                        <option disabled value="">Wybierz opcję</option>
                        {competitions.length > 0 ? (
                            competitions.map((competition) => (
                                <option value={competition.id} key={competition.id}>{competition.name}</option>
                            ))
                        ) : (
                            <option disabled={true}>Brak opcji</option>
                        )}
                    </select>
                </div>
                <button className="btn btn-success">Zatwierdź</button>
            </form>
        </>
    )
}