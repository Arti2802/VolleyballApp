import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useAuth } from "../UserContext";


export const Matches = () => {
    const { loggedIn } = useAuth();
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/matches/?page=1`)
        .then((response) => {
            console.log(response);
            setMatches(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <>
            <h1 className="float-start me-2">Mecze</h1>
            {loggedIn ? (
                <a href="/dodaj-mecz">
                    <i className="bi bi-plus-circle-fill" style={{fontSize: '32px', color: 'green'}}></i>
                </a>
            ) : null}
            <div className="row row-cols-auto gx-2 row-gap-2 under">
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <div className="col-sm-6 col-md-4" key={match.id}>
                            <a href={`/mecze/${match.id}`} className="list-group-item">
                                <div className="bg-info-subtle border rounded-2 p-2 fs-5 text-center">
                                    {match && match.team1.country.name} - {match && match.team2.country.name}
                                </div>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="col"><h2>Brak meczów</h2></div>
                )}
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item">
                        <a class="page-link" href="/" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="/">1</a></li>
                        <li class="page-item"><a class="page-link" href="/">2</a></li>
                        <li class="page-item"><a class="page-link" href="/">3</a></li>
                        <li class="page-item">
                        <a class="page-link" href="/" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}