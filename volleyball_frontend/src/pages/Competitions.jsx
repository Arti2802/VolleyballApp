import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiURL } from "../ApiURL";
import { useAuth } from "../UserContext";
import { Modal, Button } from "react-bootstrap";

export const Competitions = () => {
    const { loggedIn } = useAuth();
    const [competitions, setCompetitions] = useState([]);
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
        setCompetitions(competitions.filter((competition) => competition.id !== id));
    }

    useEffect(() => {
        axios.get(`${ApiURL}/competitions/`)
        .then(response => {
            console.log(response);
            setCompetitions(response.data.results);
        })
        .catch(err => {
            alert('Błąd połączenia z serwerem')
            console.log(err);
        })
    }, [])
    return (
        <>
            <h1 className="float-start me-2">Zawody</h1>
            {loggedIn ? (
                <a href="/dodaj-zawody">
                    <i className="bi bi-plus-circle-fill" style={{fontSize: '32px', color: 'green'}}></i>
                </a>
            ) : null}
            <div className="under">
                {competitions.length > 0 ? (
                    competitions.map((competition) => (
                        <div className="row my-2 mx-0" key={competition.id}>
                            <div className="col-10 fs-3 p-1 rounded-2 bg-info-subtle justify-content-center">
                                <a href={`/zawody/${competition.id}`} className="list-group-item list-group-item-action"> 
                                    {competition.name}
                                </a>
                            </div>
                            {loggedIn ? (
                                <div className="col-2">
                                    <a href={`/edytuj-zawody/${competition.id}`}>
                                        <i className="bi bi-pencil-square mx-2" style={{fontSize: '32px', color: 'blue'}}></i>
                                    </a>
                                    <button className="icon" type="button" onClick={() => showDeleteModal(competition.id)}>
                                        <i className="bi bi-trash-fill mx-2" style={{fontSize: '32px', color: 'red'}}></i>
                                    </button>
                                
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <h2>Brak zawodów</h2>
                )}
                <Modal show={show} onHide={hideConfirmationModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usunięcia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">
                            Czy na pewno usunąć zawody o id {id}?
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