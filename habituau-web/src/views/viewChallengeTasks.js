import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/tarefas';

class ViewChallengeTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefas: [],
      showEditModal: false,
      showDeleteModal: false,
      currentTask: {
        id: null,
        nome: '',
        qtdepontos: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  // Função para buscar todas as tarefas
  fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      this.setState({ tarefas: response.data });
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      alert('Erro ao carregar a lista de tarefas.');
    }
  };

  // Função para lidar com alterações nos inputs
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        [name]: value,
      },
    }));
  };

  // Função para editar uma tarefa
  handleEditTask = async () => {
    const { currentTask } = this.state;
    try {
      await axios.put(`${API_BASE_URL}/edit/${currentTask.id}`, currentTask);
      this.setState({ showEditModal: false });
      this.fetchTasks();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      alert('Erro ao editar tarefa.');
    }
  };

  // Função para excluir uma tarefa
  handleDeleteTask = async () => {
    const { currentTask } = this.state;
    try {
      await axios.delete(`${API_BASE_URL}/delete/${currentTask.id}`);
      this.setState({ showDeleteModal: false });
      this.fetchTasks();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa.');
    }
  };

  render() {
    const { tarefas, showEditModal, showDeleteModal, currentTask } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <h2>Gerenciar Tarefas de Desafios</h2>
          <table className="table table-hover mt-3">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Pontos</th>
                <th>ID do Desafio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map((tarefa) => (
                <tr key={tarefa.id}>
                  <td>{tarefa.id}</td>
                  <td>{tarefa.nome}</td>
                  <td>{tarefa.qtdepontos}</td>
                  <td>{tarefa.idDesafio || 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        this.setState({
                          showEditModal: true,
                          currentTask: { ...tarefa },
                        })
                      }
                    >
                      Alterar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        this.setState({
                          showDeleteModal: true,
                          currentTask: { ...tarefa },
                        })
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de edição */}
        {showEditModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Tarefa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => this.setState({ showEditModal: false })}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nome da Tarefa"
                    name="nome"
                    value={currentTask.nome}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Pontos da Tarefa"
                    name="qtdepontos"
                    value={currentTask.qtdepontos}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleEditTask}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de exclusão */}
        {showDeleteModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Excluir Tarefa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => this.setState({ showDeleteModal: false })}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Tem certeza de que deseja excluir a tarefa <strong>{currentTask.nome}</strong>?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showDeleteModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={this.handleDeleteTask}>
                    Excluir
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

export default ViewChallengeTasks;
