import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const Competition = () => {
    const { pk } = useParams();
    const [competition, setCompetition] = useState({});
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/`)
        .then((response) => {
            console.log(response);
            setCompetition(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/matches/`)
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
            <h1>{competition.name}</h1>
            <a href={`/zawody/${pk}/wyniki`}><h2>Zobacz tabele</h2></a>
            <div className="list-group">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <a href={`/mecze/${match.id}`} className="list-group-item list-group-item-action" key={match.id}>
                                {match && match.team1.country.name} - {match && match.team2.country.name} 
                            </a>
                        ))
                    ) : (
                        <li className="list-group-item"><h2>Brak meczów</h2></li>
                    )}
            </div>
        </>
    )
}