import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskListExhibit = ({ cpf }) => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get(`/api/challenges/${cpf}`);
                setChallenges(response.data);
            } catch (error) {
                console.error("Erro ao buscar desafios:", error);
            }
        };

        fetchChallenges();
    }, [cpf]);

    return (
        <div className="container">
            <div className="row">
                {[0, 1, 2].map((columnIndex) => (
                    <div className="col-md-4" key={columnIndex}>
                        <div className="card border-secondary mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Desafio {columnIndex + 1}</div>
                            <div className="card-body">
                                {challenges[columnIndex] ? (
                                    <>
                                        <h4 className="card-title">{challenges[columnIndex].desafio.nome}</h4>
                                        <ul>
                                            {challenges[columnIndex].tasks.map((task) => (
                                                <li key={task.taskId}>
                                                    <span>{task.taskName}</span>
                                                    <span>{task.completed ? " ✔️" : " ❌"}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="card-title">Sem desafio aqui</h4>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => navigate('/findChallenges')}
                                        >
                                            Novo Desafio
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskListExhibit;
