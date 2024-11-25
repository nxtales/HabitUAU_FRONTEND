import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';

const SEGMENTOS_API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/segmentos';
const CATEGORIAS_API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/categorias';

class viewCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentos: [],
      categorias: [],
      showCreateModalSegmento: false,
      showEditModalSegmento: false,
      showCreateModalCategoria: false,
      showEditModalCategoria: false,
      newSegmento: { nome: '' },
      newCategoria: { nome: '' },
      currentSegmento: null,
      currentCategoria: null,
    };
  }

  componentDidMount() {
    this.fetchSegmentos();
    this.fetchCategorias();
  }

  fetchSegmentos = async () => {
    try {
      const response = await axios.get(`${SEGMENTOS_API_BASE_URL}/list`);
      this.setState({ segmentos: response.data });
    } catch (error) {
      console.error('Erro ao buscar segmentos:', error);
      alert('Erro ao carregar a lista de segmentos.');
    }
  };

  fetchCategorias = async () => {
    try {
      const response = await axios.get(`${CATEGORIAS_API_BASE_URL}/list`);
      this.setState({ categorias: response.data });
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      alert('Erro ao carregar a lista de categorias.');
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
      await axios.post(`${SEGMENTOS_API_BASE_URL}/create`, { nome: newSegmento.nome });
      this.setState({ showCreateModalSegmento: false });
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao criar segmento:', error);
      alert('Erro ao criar segmento.');
    }
  };

  handleCreateCategoria = async () => {
    const { newCategoria } = this.state;
    try {
      await axios.post(`${CATEGORIAS_API_BASE_URL}/create`, { nome: newCategoria.nome });
      this.setState({ showCreateModalCategoria: false });
      this.fetchCategorias();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      alert('Erro ao criar categoria.');
    }
  };

  handleEditSegmento = async () => {
    const { currentSegmento } = this.state;
    try {
      await axios.put(`${SEGMENTOS_API_BASE_URL}/update/${currentSegmento.id}`, { nome: currentSegmento.nome });
      this.setState({ showEditModalSegmento: false });
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao editar segmento:', error);
      alert('Erro ao editar segmento.');
    }
  };

  handleEditCategoria = async () => {
    const { currentCategoria } = this.state;
    try {
      await axios.put(`${CATEGORIAS_API_BASE_URL}/update/${currentCategoria.id}`, { nome: currentCategoria.nome });
      this.setState({ showEditModalCategoria: false });
      this.fetchCategorias();
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
      alert('Erro ao editar categoria.');
    }
  };

  handleDeleteSegmento = async (id) => {
    try {
      await axios.delete(`${SEGMENTOS_API_BASE_URL}/delete/${id}`);
      this.fetchSegmentos();
    } catch (error) {
      console.error('Erro ao deletar segmento:', error);
      alert('Erro ao deletar segmento.');
    }
  };

  handleDeleteCategoria = async (id) => {
    try {
      await axios.delete(`${CATEGORIAS_API_BASE_URL}/delete/${id}`);
      this.fetchCategorias();
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      alert('Erro ao deletar categoria.');
    }
  };

  render() {
    const {
      segmentos,
      categorias,
      showCreateModalSegmento,
      showEditModalSegmento,
      showCreateModalCategoria,
      showEditModalCategoria,
      newSegmento,
      newCategoria,
      currentSegmento,
      currentCategoria,
    } = this.state;

    return (
      <>
        <AdminNavBar />
        <div className="container mt-5">
          {/* Tabela de Segmentos */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Gerenciar Segmentos</h2>
              <button
                className="btn btn-success"
                onClick={() => this.setState({ showCreateModalSegmento: true })}
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
                          this.setState({ showEditModalSegmento: true, currentSegmento: { ...segmento } })
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

          {/* Tabela de Categorias */}
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Gerenciar Categorias</h2>
              <button
                className="btn btn-success"
                onClick={() => this.setState({ showCreateModalCategoria: true })}
              >
                Criar Nova Categoria
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
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>{categoria.id}</td>
                    <td>{categoria.nome}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() =>
                          this.setState({ showEditModalCategoria: true, currentCategoria: { ...categoria } })
                        }
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDeleteCategoria(categoria.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modais de criação e edição de Segmentos */}
        {showCreateModalSegmento && (
          <Modal
            title="Criar Novo Segmento"
            onClose={() => this.setState({ showCreateModalSegmento: false })}
            onSubmit={this.handleCreateSegmento}
          >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome do Segmento"
              name="nome"
              value={newSegmento.nome}
              onChange={(e) => this.handleInputChange(e, 'newSegmento')}
            />
          </Modal>
        )}

        {showEditModalSegmento && currentSegmento && (
          <Modal
            title="Editar Segmento"
            onClose={() => this.setState({ showEditModalSegmento: false })}
            onSubmit={this.handleEditSegmento}
          >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome do Segmento"
              name="nome"
              value={currentSegmento.nome}
              onChange={(e) => this.handleInputChange(e, 'currentSegmento')}
            />
          </Modal>
        )}

        {/* Modais de criação e edição de Categorias */}
        {showCreateModalCategoria && (
          <Modal
            title="Criar Nova Categoria"
            onClose={() => this.setState({ showCreateModalCategoria: false })}
            onSubmit={this.handleCreateCategoria}
          >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome da Categoria"
              name="nome"
              value={newCategoria.nome}
              onChange={(e) => this.handleInputChange(e, 'newCategoria')}
            />
          </Modal>
        )}

        {showEditModalCategoria && currentCategoria && (
          <Modal
            title="Editar Categoria"
            onClose={() => this.setState({ showEditModalCategoria: false })}
            onSubmit={this.handleEditCategoria}
          >
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome da Categoria"
              name="nome"
              value={currentCategoria.nome}
              onChange={(e) => this.handleInputChange(e, 'currentCategoria')}
            />
          </Modal>
        )}
      </>
    );
  }
}

const Modal = ({ title, onClose, onSubmit, children }) => (
  <div className="modal show d-block">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default viewCategories;
