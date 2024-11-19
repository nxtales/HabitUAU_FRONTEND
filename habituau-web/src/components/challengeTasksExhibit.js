import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskListExhibit = () => {
    const [challenges, setChallenges] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(new Set());
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const cpf = localStorage.getItem('cpf'); // Obtém o CPF do localStorage

    // Busca desafios e tarefas completas
    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get(
                    'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/challenges/getuserchallengetasks',
                    { params: { cpf } }
                );
                setChallenges(response.data);

                // Busca tarefas já completadas
                const completedResponse = await axios.get(
                    'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/tarefas/completed',
                    { params: { cpf } }
                );
                const completedIds = new Set(completedResponse.data.map((task) => task.tarefaId));
                setCompletedTasks(completedIds);
            } catch (error) {
                console.error('Erro ao buscar desafios e tarefas completas:', error);
            }
        };

        fetchChallenges();
    }, [cpf]);

    // Abre o modal para envio da tarefa
    const handleOpenModal = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    // Fecha o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
        setSelectedImage(null);
    };

    // Gerencia a seleção de imagem
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    // Submete a tarefa para validação e conclusão
    const handleSubmit = async () => {
        if (!selectedImage || !selectedTask?.taskId) {
            alert('Por favor, selecione uma imagem antes de enviar.');
            return;
        }

        const formData = new FormData();
        formData.append('tarefaId', selectedTask.taskId);
        formData.append('cpfCliente', cpf);
        formData.append('image', selectedImage);

        console.log('FormData enviado:');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.post(
                'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/tarefas/validateAndComplete',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            alert(response.data);

            // Marca a tarefa como completada localmente
            setCompletedTasks((prev) => new Set(prev.add(selectedTask.taskId)));

            handleCloseModal();
        } catch (error) {
            console.error('Erro ao enviar a tarefa:', error.response?.data || error.message);
            alert('Erro ao enviar a tarefa. Verifique os dados e tente novamente.');
        }
    };

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
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nome</th>
                                                    <th>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {challenges[columnIndex].tasks && challenges[columnIndex].tasks.length > 0 ? (
                                                    challenges[columnIndex].tasks.map((task, index) => (
                                                        <tr key={index}>
                                                            <td>{task.taskId}</td>
                                                            <td>{task.taskName || 'Tarefa sem nome'}</td>
                                                            <td>
                                                                {completedTasks.has(task.taskId) ? (
                                                                    <span className="text-success">Concluída</span>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-primary btn-sm"
                                                                        onClick={() => handleOpenModal(task)}
                                                                    >
                                                                        Enviar
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">Sem tarefas para este desafio</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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

            {showModal && (
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Enviar Tarefa</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">CPF do Cliente</label>
                                    <input type="text" className="form-control" value={cpf} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ID da Tarefa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedTask?.taskId || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome da Tarefa</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedTask?.taskName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Selecione a Imagem</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button className="btn btn-success" onClick={handleSubmit}>
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskListExhibit;
