import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/segmentos';

class ViewCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentos: [],
      showCreateModal: false,
      showEditModal: false,
      newSegmento: {
        nome: '',
      },
      currentSegmento: null,
    };
  }

  componentDidMount() {
    this.fetchSegmentos();
  }

  fetchSegmentos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      this.setState({ segmentos: response.data });
    } catch (error) {
      console.error('Erro ao buscar segmentos:', error);
      alert('Erro ao carregar a lista de segmentos.');
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

  handleCreateSegmento = async () => {
    const { newSegmento } = this.state;
    try {
      const payload = { nome: newSegmento.nome };
      await axios.post(`${API_BASE_URL}/create`, payload);
      this.setState({ showCreateModal: false });
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao criar segmento:', error);
      alert('Erro ao criar segmento.');
    }
  };

  handleEditSegmento = async () => {
    const { currentSegmento } = this.state;
    try {
      const payload = { nome: currentSegmento.nome };
      await axios.put(`${API_BASE_URL}/update/${currentSegmento.id}`, payload);
      this.setState({ showEditModal: false });
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao editar segmento:', error);
      alert('Erro ao editar segmento.');
    }
  };

  handleDeleteSegmento = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao deletar segmento:', error);
      alert('Erro ao deletar segmento.');
    }
  };

  render() {
    const { segmentos, showCreateModal, showEditModal, newSegmento, currentSegmento } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gerenciar Segmentos</h2>
            <button
              className="btn btn-success"
              onClick={() => this.setState({ showCreateModal: true })}
            >
              Criar Novo Segmento
            </button>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {segmentos.map((segmento) => (
                <tr key={segmento.id}>
                  <td>{segmento.id}</td>
                  <td>{segmento.nome}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        this.setState({ showEditModal: true, currentSegmento: { ...segmento } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteSegmento(segmento.id)}
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
                  <h5 className="modal-title">Criar Nova Categoria</h5>
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
                    placeholder="Nome da Categoria"
                    name="nome"
                    value={newSegmento.nome}
                    onChange={(e) => this.handleInputChange(e, 'newSegmento')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showCreateModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleCreateSegmento}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {showEditModal && currentSegmento && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Categoria</h5>
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
                    placeholder="Nome da Categoria"
                    name="nome"
                    value={currentSegmento.nome}
                    onChange={(e) => this.handleInputChange(e, 'currentSegmento')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={this.handleEditSegmento}>
                    Salvar Alterações
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

export default ViewCategories;
