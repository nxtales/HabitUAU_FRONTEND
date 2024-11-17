import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/parceiros';

class ViewParceiros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parceiros: [],
      segmentos: [],
      showCreateModal: false,
      showEditModal: false,
      currentParceiro: null,
      newParceiro: {
        nome: '',
        segmentoId: '',
        qtdeDesafios: 0,
        foto: null,
      },
    };
  }

  componentDidMount() {
    this.fetchParceiros();
    this.fetchSegmentos();
  }

  fetchParceiros = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`);
      this.setState({ parceiros: response.data });
    } catch (error) {
      console.error('Erro ao buscar parceiros:', error);
      alert('Erro ao carregar a lista de parceiros.');
    }
  };

  fetchSegmentos = async () => {
    try {
      const response = await axios.get('https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/segmentos/list');
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

  handleFileChange = (e, type) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState((prevState) => ({
        [type]: {
          ...prevState[type],
          foto: reader.result.split(',')[1], // Base64 string
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  handleCreateParceiro = async () => {
    const { newParceiro } = this.state;
    try {
      const payload = {
        nome: newParceiro.nome,
        segmentoId: parseInt(newParceiro.segmentoId, 10),
        qtdeDesafios: parseInt(newParceiro.qtdeDesafios, 10),
        foto: newParceiro.foto,
      };

      await axios.post(`${API_BASE_URL}/create`, payload);
      this.setState({ showCreateModal: false });
      this.fetchParceiros();
    } catch (error) {
      console.error('Erro ao criar parceiro:', error);
      alert('Erro ao criar parceiro.');
    }
  };

  handleEditParceiro = async () => {
    const { currentParceiro } = this.state;
    try {
      const payload = {
        nome: currentParceiro.nome,
        segmentoId: parseInt(currentParceiro.segmentoId, 10),
        qtdeDesafios: parseInt(currentParceiro.qtdeDesafios, 10),
        foto: currentParceiro.foto,
      };

      await axios.put(`${API_BASE_URL}/update/${currentParceiro.id}`, payload);
      this.setState({ showEditModal: false });
      this.fetchParceiros();
    } catch (error) {
      console.error('Erro ao editar parceiro:', error);
      alert('Erro ao editar parceiro.');
    }
  };

  handleDeleteParceiro = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      this.fetchParceiros();
    } catch (error) {
      console.error('Erro ao deletar parceiro:', error);
      alert('Erro ao deletar parceiro.');
    }
  };

  render() {
    const { parceiros, segmentos, showCreateModal, showEditModal, newParceiro, currentParceiro } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gerenciar Parceiros</h2>
            <button
              className="btn btn-success"
              onClick={() => this.setState({ showCreateModal: true })}
            >
              Criar Novo Parceiro
            </button>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Segmento</th>
                <th>Quantidade de Desafios</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {parceiros.map((parceiro) => (
                <tr key={parceiro.id}>
                  <td>{parceiro.id}</td>
                  <td>{parceiro.nome}</td>
                  <td>{parceiro.segmentoId}</td>
                  <td>{parceiro.qtdeDesafios}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        this.setState({ showEditModal: true, currentParceiro: { ...parceiro } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteParceiro(parceiro.id)}
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
                  <h5 className="modal-title">Criar Novo Parceiro</h5>
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
                    placeholder="Nome"
                    name="nome"
                    value={newParceiro.nome}
                    onChange={(e) => this.handleInputChange(e, 'newParceiro')}
                  />
                  <select
                    className="form-control mb-2"
                    name="segmentoId"
                    value={newParceiro.segmentoId}
                    onChange={(e) => this.handleInputChange(e, 'newParceiro')}
                  >
                    <option value="">Selecione um Segmento</option>
                    {segmentos.map((segmento) => (
                      <option key={segmento.id} value={segmento.id}>
                        {segmento.nome}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Quantidade de Desafios"
                    name="qtdeDesafios"
                    value={newParceiro.qtdeDesafios}
                    onChange={(e) => this.handleInputChange(e, 'newParceiro')}
                  />
                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    onChange={(e) => this.handleFileChange(e, 'newParceiro')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showCreateModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleCreateParceiro}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {showEditModal && currentParceiro && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Parceiro</h5>
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
                    placeholder="Nome"
                    name="nome"
                    value={currentParceiro.nome}
                    onChange={(e) => this.handleInputChange(e, 'currentParceiro')}
                  />
                  <select
                    className="form-control mb-2"
                    name="segmentoId"
                    value={currentParceiro.segmentoId}
                    onChange={(e) => this.handleInputChange(e, 'currentParceiro')}
                  >
                    <option value="">Selecione um Segmento</option>
                    {segmentos.map((segmento) => (
                      <option key={segmento.id} value={segmento.id}>
                        {segmento.nome}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Quantidade de Desafios"
                    name="qtdeDesafios"
                    value={currentParceiro.qtdeDesafios}
                    onChange={(e) => this.handleInputChange(e, 'currentParceiro')}
                  />
                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    onChange={(e) => this.handleFileChange(e, 'currentParceiro')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={this.handleEditParceiro}>
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

export default ViewParceiros;
