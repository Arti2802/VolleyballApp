import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const Team = () => {
    const { pk } = useParams();
    const [team, setTeam] = useState({});
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/teams/${pk}/`)
        .then((response) => {
            console.log(response);
            setTeam(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    useEffect(() => {
        axios.get(`${ApiURL}/teams/${pk}/matches`)
        .then((response) => {
            console.log(response);
            setMatches(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    return (
        <>
            <h1>{team.name}</h1>
            <h2>Mecze</h2>
            <div className="row cols-auto">
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <div className="col-4" key={match.id}>
                            {match.team1.country.name} - {match.team2.country.name}
                        </div>
                    ))
                ) : (
                    <h2>Ta drużyna nie rozegrała jeszcze żadnych meczów</h2>
                )}
            </div>
        </>
    )
}