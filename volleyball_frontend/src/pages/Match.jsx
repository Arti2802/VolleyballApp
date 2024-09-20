import React from "react";
import axios from "axios";
import { ApiURL } from "../ApiURL";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";


export const Match = () => {
    const { pk } = useParams();
    const navigate = useNavigate();

    const [match, setMatch] = useState({});
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(false);
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
        axios.delete(`${ApiURL}/matches/${id}/`)
        .then(response => {
            console.log(response);
        })
        setShow(false);
        navigate('/mecze');
    }

    useEffect(() => {
        axios.get(`${ApiURL}/matches/${pk}/`)
        .then((response) => {
            console.log(response);
            setMatch(response.data);
            setLoading(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    useEffect(() => {
        axios.get(`${ApiURL}/matches/${pk}/sets/`)
        .then((response) => {
            console.log(response);
            setSets(response.data.results);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [pk])
    return (
        <>
            {/* <h1>Mecz</h1> */}
            {loading ? <h1 className="text-center">{match.team1.name} - {match.team2.name}</h1> : null}
            <button className="icon float-end" type="button" onClick={() => showDeleteModal(match.id)}>
                <i className="bi bi-trash-fill mx-2" style={{fontSize: '32px', color: 'red'}}></i>
            </button>
            <h2 className="text-center">{match.sets1} - {match.sets2}</h2>
            <div className="d-flex justify-content-center">
                {sets.length > 0 ? (
                    sets.map((set) => (
                        <div className="p-2" key={set.id}>
                            {set.points1} - {set.points2}
                        </div>
                    ))
                ) : (
                    <h2>Brak setów</h2>
                )}
                <Modal show={show} onHide={hideConfirmationModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Potwierdzenie usunięcia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="alert alert-danger">
                            Czy na pewno usunąć mecz o id {id}?
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