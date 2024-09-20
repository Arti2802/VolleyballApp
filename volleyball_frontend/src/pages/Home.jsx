import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";


export const Home = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`${ApiURL}/articles/`)
        .then((response) => {
            console.log(response);
            setArticles(response.data.results);
        })
        .catch((err) => {
            console.log(err);
            alert('Brak połączenia z serwerem!');
        })
    }, [])

    return (
        <>
            <h1>Aktualności</h1>
            <div>
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div className="border border-primary rounded-1 my-4 p-2" key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                        </div>
                    ))
                ) : (
                    <h2>Brak artykułów</h2>
                )}
            </div>
        </>
    )
}
