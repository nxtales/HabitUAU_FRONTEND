import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/challenges';

class ViewChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: [],
      showCreateModal: false,
      showEditModal: false,
      newChallenge: {
        nome: '',
        parceiroId: '',
        categoriaId: '',
        tarefas: [],
      },
      currentChallenge: {
        id: null,
        nome: '',
        parceiroId: '',
        categoriaId: '',
        tarefas: [],
      },
      newTask: {
        nome: '',
        qtdepontos: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchChallenges();
  }

  fetchChallenges = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      const challenges = response.data.map((challenge) => ({
        id: challenge.id,
        nome: challenge.nome,
        parceiro: challenge.parceiro ? challenge.parceiro.nome : 'N/A',
        categoria: challenge.categoria ? challenge.categoria.nome : 'N/A',
        tarefasCount: challenge.tarefas ? challenge.tarefas.length : 0,
      }));
      this.setState({ challenges });
    } catch (error) {
      console.error('Erro ao buscar desafios:', error);
      alert('Erro ao carregar a lista de desafios.');
    }
  };

  handleInputChange = (e, type) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      [type]: {
        ...prevState[type],
        [name]: value,
      },
    }));
  };

  addTaskToChallenge = (type) => {
    const { newTask } = this.state;

    // Validação da tarefa antes de adicionar
    if (!newTask.nome || newTask.qtdepontos <= 0) {
      alert('O nome da tarefa e os pontos devem ser válidos.');
      return;
    }

    this.setState((prevState) => ({
      [type]: {
        ...prevState[type],
        tarefas: [...prevState[type].tarefas, newTask],
      },
      newTask: { nome: '', qtdepontos: 0 },
    }));
  };

  removeTaskFromChallenge = (taskIndex, type) => {
    this.setState((prevState) => ({
      [type]: {
        ...prevState[type],
        tarefas: prevState[type].tarefas.filter((_, index) => index !== taskIndex),
      },
    }));
  };

  handleCreateChallenge = async () => {
    const { newChallenge } = this.state;

    // Validação dos campos do desafio
    if (!newChallenge.nome || !newChallenge.parceiroId || !newChallenge.categoriaId) {
      alert('Todos os campos do desafio devem ser preenchidos.');
      return;
    }

    // Validação das tarefas
    for (const task of newChallenge.tarefas) {
      if (!task.nome || task.qtdepontos <= 0) {
        alert('Todas as tarefas devem ter um nome e pontos maiores que zero.');
        return;
      }
    }

    try {
      await axios.post(`${API_BASE_URL}/create`, newChallenge);
      this.setState({ showCreateModal: false });
      this.fetchChallenges();
    } catch (error) {
      console.error('Erro ao criar desafio:', error);
      alert('Erro ao criar desafio.');
    }
  };

  handleEditChallenge = async () => {
    const { currentChallenge } = this.state;
    try {
      await axios.put(`${API_BASE_URL}/update/${currentChallenge.id}`, currentChallenge);
      this.setState({ showEditModal: false });
      this.fetchChallenges();
    } catch (error) {
      console.error('Erro ao editar desafio:', error);
      alert('Erro ao editar desafio.');
    }
  };

  handleDeleteChallenge = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      this.fetchChallenges();
    } catch (error) {
      console.error('Erro ao deletar desafio:', error);
      alert('Erro ao deletar desafio.');
    }
  };

  render() {
    const {
      challenges,
      showCreateModal,
      showEditModal,
      newChallenge,
      currentChallenge,
      newTask,
    } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gerenciar Desafios</h2>
            <button
              className="btn btn-success"
              onClick={() => this.setState({ showCreateModal: true })}
            >
              Criar Novo Desafio
            </button>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Parceiro</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td>{challenge.id}</td>
                  <td>{challenge.nome}</td>
                  <td>{challenge.parceiro}</td>
                  <td>{challenge.categoria}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteChallenge(challenge.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de criação */}
        {showCreateModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Criar Novo Desafio</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => this.setState({ showCreateModal: false })}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nome do Desafio"
                    name="nome"
                    value={newChallenge.nome}
                    onChange={(e) => this.handleInputChange(e, 'newChallenge')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Parceiro ID"
                    name="parceiroId"
                    value={newChallenge.parceiroId}
                    onChange={(e) => this.handleInputChange(e, 'newChallenge')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Categoria ID"
                    name="categoriaId"
                    value={newChallenge.categoriaId}
                    onChange={(e) => this.handleInputChange(e, 'newChallenge')}
                  />

                  <h5>Tarefas:</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Pontos</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newChallenge.tarefas.map((task, index) => (
                        <tr key={index}>
                          <td>{task.nome}</td>
                          <td>{task.qtdepontos}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => this.removeTaskFromChallenge(index, 'newChallenge')}
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nome da Tarefa"
                    name="nome"
                    value={newTask.nome}
                    onChange={(e) => this.handleInputChange(e, 'newTask')}
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Pontos da Tarefa"
                    name="qtdepontos"
                    value={newTask.qtdepontos}
                    onChange={(e) => this.handleInputChange(e, 'newTask')}
                  />
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => this.addTaskToChallenge('newChallenge')}
                  >
                    Adicionar Tarefa
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showCreateModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleCreateChallenge}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ViewChallenges;
