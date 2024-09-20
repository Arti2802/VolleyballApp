import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";


export const Ranking = () => {
    const [ranks, setRanks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        for(let i=0; i<ranks.length; i++)
        {
            axios.put(`${ApiURL}/update-points/${ranks.at(i).id}/`)
            .then((response) => {
                console.log(response);
            })
        }
        axios.put(`${ApiURL}/ranking/update/`);
    }, [ranks])

    useEffect(() => {
        axios.get(`${ApiURL}/ranking/`)
        .then((response) => {
            console.log(response);
            setRanks(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }, [])

    return (
        <>
            <h1>Ranking</h1>
            {loading ? null : (
                <table className="table table-hover my-3">
                    <thead>
                        <tr>
                            <th>Miejsce</th>
                            <th>Drużyna</th>
                            <th className="text-center">Punkty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranks.length > 0 ? (
                            ranks.map((rank) => (
                                <tr key={rank.id}>
                                    <td>{rank.position}.</td>
                                    <td>{rank && rank.team.name} {rank.team.country.flag}</td>
                                    <td className="text-center">{rank.points}</td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan={3}>
                                    <h2>Brak drużyn w rankingu</h2>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )} 
        </>
    )
}