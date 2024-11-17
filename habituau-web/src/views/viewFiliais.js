import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/filial';

class ViewFiliais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filiais: [],
      showCreateModal: false,
      showEditModal: false,
      currentFilial: null,
      newFilial: {
        cidade: '',
        CEP: '',
        endereco: '',
        nome: '',
      },
    };
  }

  componentDidMount() {
    this.fetchFiliais();
  }

  fetchFiliais = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      this.setState({ filiais: response.data });
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
      alert('Erro ao carregar a lista de filiais.');
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

  handleCreateFilial = async () => {
    try {
      const { newFilial } = this.state;
      await axios.post(`${API_BASE_URL}/create`, newFilial);
      this.setState({ showCreateModal: false });
      this.fetchFiliais();
    } catch (error) {
      console.error('Erro ao criar filial:', error);
      alert('Erro ao criar filial.');
    }
  };

  handleEditFilial = async () => {
    try {
      const { currentFilial } = this.state;
      await axios.put(`${API_BASE_URL}/update/${currentFilial.id}`, currentFilial);
      this.setState({ showEditModal: false });
      this.fetchFiliais();
    } catch (error) {
      console.error('Erro ao editar filial:', error);
      alert('Erro ao editar filial.');
    }
  };

  handleDeleteFilial = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      this.fetchFiliais();
    } catch (error) {
      console.error('Erro ao deletar filial:', error);
      alert('Erro ao deletar filial.');
    }
  };

  render() {
    const { filiais, showCreateModal, showEditModal, newFilial, currentFilial } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gerenciar Filiais</h2>
            <button
              className="btn btn-success"
              onClick={() => this.setState({ showCreateModal: true })}
            >
              Criar Nova Filial
            </button>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>Nome</th>
                <th>Cidade</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filiais.map((filial) => (
                <tr key={filial.ID}>
                  <td>{filial.nome}</td>
                  <td>{filial.cidade}</td>
                  <td>{filial.CEP}</td>
                  <td>{filial.endereco}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        this.setState({ showEditModal: true, currentFilial: { ...filial } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteFilial(filial.id)}
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
                  <h5 className="modal-title">Criar Nova Filial</h5>
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
                    value={newFilial.nome}
                    onChange={(e) => this.handleInputChange(e, 'newFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Cidade"
                    name="cidade"
                    value={newFilial.cidade}
                    onChange={(e) => this.handleInputChange(e, 'newFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="CEP"
                    name="CEP"
                    value={newFilial.cep}
                    onChange={(e) => this.handleInputChange(e, 'newFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Endereço"
                    name="endereco"
                    value={newFilial.endereco}
                    onChange={(e) => this.handleInputChange(e, 'newFilial')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showCreateModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleCreateFilial}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {showEditModal && currentFilial && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Filial</h5>
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
                    value={currentFilial.nome}
                    onChange={(e) => this.handleInputChange(e, 'currentFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Cidade"
                    name="cidade"
                    value={currentFilial.cidade}
                    onChange={(e) => this.handleInputChange(e, 'currentFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="CEP"
                    name="CEP"
                    value={currentFilial.cep}
                    onChange={(e) => this.handleInputChange(e, 'currentFilial')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Endereço"
                    name="endereco"
                    value={currentFilial.endereco}
                    onChange={(e) => this.handleInputChange(e, 'currentFilial')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={this.handleEditFilial}>
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

export default ViewFiliais;
