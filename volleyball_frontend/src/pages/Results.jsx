import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const Results = () => {
    const { pk } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/competitions/${pk}/results/`)
        .then((response) => {
            console.log(response);
            setResults(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    return (
        <div style={{margin : '10px'}}>
            <h1>Wyniki</h1>
            <table className="table table-hover table-bordered border-dark my-3">
                <thead>
                    <tr className="text-center">
                        <th className="text-start">Drużyna</th>
                        <th>Liczba meczów</th>
                        <th>Wygrane (3:2)</th>
                        <th>Przegrane (2:3)</th>
                        <th>Punkty</th>
                    </tr>
                </thead>
                <tbody>
                    {results.length > 0 ? (
                            results.map((result) => (
                                <tr key={result.team_id}>
                                    <td>{result.team_name}</td>
                                    <td className="text-center">{result.matches_total}</td>
                                    <td className="text-center">{result.wons_total} ({result.wons_tb_total})</td>
                                    <td className="text-center">{result.losts_total} ({result.losts_tb_total})</td>
                                    <td className="text-center">{result.points_total}</td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">
                                <h2>Nie ma jeszce dostępnych wyników</h2>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}