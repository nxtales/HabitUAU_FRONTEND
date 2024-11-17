import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/admin';

class ViewAdmins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      showCreateModal: false,
      showEditModal: false,
      currentAdmin: null,
      newAdmin: {
        re: '', // ID do administrador
        email: '',
        nome: '',
        sobrenome: '',
        filialId: '',
        senha: '',
        telefone: '',
      },
    };
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/GetAll`);
      this.setState({ admins: response.data });
    } catch (error) {
      console.error('Erro ao buscar administradores:', error);
      alert('Erro ao carregar a lista de administradores.');
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

  handleCreateAdmin = async () => {
    const { newAdmin } = this.state;
    try {
      const payload = {
        re: parseInt(newAdmin.re, 10),
        email: newAdmin.email,
        nome: newAdmin.nome,
        sobrenome: newAdmin.sobrenome,
        filialId: parseInt(newAdmin.filialId, 10),
        senha: newAdmin.senha,
        telefone: newAdmin.telefone,
      };

      await axios.post(`${API_BASE_URL}/register`, payload);
      this.setState({ showCreateModal: false });
      this.fetchAdmins();
    } catch (error) {
      console.error('Erro ao criar administrador:', error);
      alert('Erro ao criar administrador.');
    }
  };

  handleEditAdmin = async () => {
    const { currentAdmin } = this.state;
    try {
      const payload = {
        re: parseInt(currentAdmin.re, 10),
        email: currentAdmin.email,
        nome: currentAdmin.nome,
        sobrenome: currentAdmin.sobrenome,
        filialId: parseInt(currentAdmin.filialId, 10),
        senha: currentAdmin.senha,
        telefone: currentAdmin.telefone,
      };

      await axios.put(`${API_BASE_URL}/update/${currentAdmin.re}`, payload);
      this.setState({ showEditModal: false });
      this.fetchAdmins();
    } catch (error) {
      console.error('Erro ao editar administrador:', error);
      alert('Erro ao editar administrador.');
    }
  };

  handleDeleteAdmin = async (re) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${re}`);
      this.fetchAdmins();
    } catch (error) {
      console.error('Erro ao deletar administrador:', error);
      alert('Erro ao deletar administrador.');
    }
  };

  render() {
    const { admins, showCreateModal, showEditModal, newAdmin, currentAdmin } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Gerenciar Administradores</h2>
            <button
              className="btn btn-success"
              onClick={() => this.setState({ showCreateModal: true })}
            >
              Criar Novo Administrador
            </button>
          </div>

          <table className="table table-hover">
            <thead className="table-primary">
              <tr>
                <th>RE</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Filial</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.re}>
                  <td>{admin.re}</td>
                  <td>{admin.nome}</td>
                  <td>{admin.sobrenome}</td>
                  <td>{admin.email}</td>
                  <td>{admin.filialId}</td>
                  <td>{admin.telefone}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() =>
                        this.setState({ showEditModal: true, currentAdmin: { ...admin } })
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteAdmin(admin.re)}
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
                  <h5 className="modal-title">Criar Novo Administrador</h5>
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
                    placeholder="RE"
                    name="re"
                    value={newAdmin.re}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nome"
                    name="nome"
                    value={newAdmin.nome}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Sobrenome"
                    name="sobrenome"
                    value={newAdmin.sobrenome}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    name="email"
                    value={newAdmin.email}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Filial ID"
                    name="filialId"
                    value={newAdmin.filialId}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Telefone"
                    name="telefone"
                    value={newAdmin.telefone}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Senha"
                    name="senha"
                    value={newAdmin.senha}
                    onChange={(e) => this.handleInputChange(e, 'newAdmin')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showCreateModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={this.handleCreateAdmin}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {showEditModal && currentAdmin && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Administrador</h5>
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
                    value={currentAdmin.nome}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Sobrenome"
                    name="sobrenome"
                    value={currentAdmin.sobrenome}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                  <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    name="email"
                    value={currentAdmin.email}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Filial ID"
                    name="filialId"
                    value={currentAdmin.filialId}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Telefone"
                    name="telefone"
                    value={currentAdmin.telefone}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Senha"
                    name="senha"
                    value={currentAdmin.senha}
                    onChange={(e) => this.handleInputChange(e, 'currentAdmin')}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary" onClick={this.handleEditAdmin}>
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

export default ViewAdmins;
