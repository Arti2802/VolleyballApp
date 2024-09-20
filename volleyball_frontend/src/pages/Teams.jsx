import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useAuth } from "../UserContext";
import { Modal, Button } from "react-bootstrap";


export const Teams = () => {
    const { loggedIn } = useAuth();
    const [teams, setTeams] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    const showDeleteModal = (id) => {
        setShow(true);
        setId(id);
    };
    const hideConfirmationModal = () => {
        setShow(false);
    };
    const handleDelete = (id) => {
        axios.delete(`${ApiURL}/competitions/${id}/`)
        .then(response => {
            console.log(response);
        })
        setShow(false);
        setTeams(teams.filter((competition) => competition.id !== id));
    }

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
    return (
        <>
            <h1 className="float-start me-2">Drużyny</h1>
            {loggedIn ? (
                <a href="/dodaj-druzyne">
                    <i className="bi bi-plus-circle-fill" style={{fontSize: '32px', color: 'green'}}></i>
                </a>
            ) : null}
            <div className="list-group under">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <div className="row" key={team.id}>
                            <div className="col-md-8 col-sm-6 col-xs-4">
                                <a href={`/druzyny/${team.id}`} className="list-group-item list-group-item-action">
                                    {team.name}
                                </a>
                            </div>
                            {loggedIn ? (
                                <div className="col-md-4 col-sm-6 col-xs-2">
                                    <a href={`/edytuj-druzyne/${team.id}`}>
                                        <i className="bi bi-pencil-square mx-2" style={{fontSize: '32px', color: 'blue'}}></i>
                                    </a>
                                    <button className="icon" type="button" onClick={() => showDeleteModal(team.id)}>
                                        <i className="bi bi-trash-fill mx-2" style={{fontSize: '32px', color: 'red'}}></i>
                                    </button>
                                
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <li className="list-group-item"><h2>Brak drużyn</h2></li>
                )}
                <Modal show={show} onHide={hideConfirmationModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usunięcia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">
                            Czy na pewno usunąć drużynę o id {id}?
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="default" onClick={hideConfirmationModal}>
                        Anuluj
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(id)}>
                        Usuń
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}