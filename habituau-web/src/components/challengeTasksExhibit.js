import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskListExhibit = () => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const cpf = localStorage.getItem('cpf'); // Obtém o CPF do localStorage
                const response = await axios.get(
                    'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/challenges/getuserchallengetasks',
                    { params: { cpf } }
                );
                setChallenges(response.data);
            } catch (error) {
                console.error("Erro ao buscar desafios:", error);
            }
        };

        fetchChallenges();
    }, []);

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
                                            {/* Exibe as tarefas se existirem */}
                                            {challenges[columnIndex].tasks && challenges[columnIndex].tasks.length > 0 ? (
                                                challenges[columnIndex].tasks.map((task, index) => (
                                                    <li key={index}>
                                                        <span>{task.taskName || "Tarefa sem nome"}</span>
                                                        <span>{task.completed ? " ✔️" : " ❌"}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>Sem tarefas para este desafio</li>
                                            )}
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
