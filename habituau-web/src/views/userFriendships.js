import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class UserFriendships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailToAdd: '', // Email do amigo a ser adicionado
      friends: [], // Lista de amigos
      userEmail: null, // Email do usuário autenticado
    };
  }

  async componentDidMount() {
    await this.fetchUserEmail(); // Obtém o e-mail do usuário autenticado
    this.fetchFriends(); // Busca a lista de amizades
  }

  // Função para buscar o e-mail do usuário autenticado pelo CPF armazenado
  fetchUserEmail = async () => {
    const cpf = localStorage.getItem('cpf');
    if (!cpf) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/api/cliente/retrieve/${cpf}`);
      const userInfo = response.data;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      this.setState({ userEmail: userInfo.email });
    } catch (error) {
      console.error('Erro ao buscar e-mail do usuário:', error);
      toast.error('Erro ao obter e-mail do usuário.');
    }
  };

  // Função para buscar a lista de amizades e calcular os pontos com base no desafio de maior pontuação
  fetchFriends = async () => {
    const cpf = localStorage.getItem('cpf'); // CPF do usuário autenticado
    if (!cpf) {
      toast.error('CPF não encontrado. Por favor, autentique-se novamente.');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/amizades/cliente/${cpf}`);
      const friendsData = response.data;

      console.log('Dados retornados da API de amigos:', friendsData);

      // Verifica qual cliente é o amigo com base no CPF atual
      const friendsWithDetails = await Promise.all(
        friendsData.map(async (friend) => {
          const isCurrentUserCliente1 = friend.cpfCliente1 === cpf;

          const amigoCpf = isCurrentUserCliente1 ? friend.cpfCliente2 : friend.cpfCliente1; // CPF do amigo
          const amigoNome = isCurrentUserCliente1 ? friend.nomeCliente2 : friend.nomeCliente1; // Nome do amigo

          // Chama a API `/pordesafio/{cpfCliente}` para obter a pontuação
          let totalPoints = 0;
          try {
            const pointsResponse = await axios.get(`${API_BASE_URL}/api/ranking/pordesafio/${amigoCpf}`);
            totalPoints = pointsResponse.data.pontos || 0;
          } catch (error) {
            console.error(`Erro ao buscar pontos para o CPF ${amigoCpf}:`, error);
          }

          return {
            nome: amigoNome,
            email: friend.email, // Email já retornado pela API
            totalPoints, // Pontuação do amigo
          };
        })
      );

      this.setState({ friends: friendsWithDetails });
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
      toast.error('Erro ao carregar lista de amigos.');
    }
  };

  // Função para adicionar um novo amigo
  addFriend = async () => {
    const { userEmail, emailToAdd } = this.state;

    if (!emailToAdd) {
      toast.error('Digite um e-mail válido para adicionar um amigo.');
      return;
    }

    try {
      console.log('Tentando adicionar amigo com emailCliente1:', userEmail, ', emailCliente2:', emailToAdd);
      const response = await axios.post(
        `${API_BASE_URL}/api/amizades/create`,
        null,
        { params: { emailCliente1: userEmail, emailCliente2: emailToAdd } }
      );
      console.log('Amizade criada com sucesso:', response.data);
      toast.success('Amigo adicionado com sucesso!');
      this.fetchFriends(); // Atualiza a lista de amigos após a adição
    } catch (error) {
      console.error('Erro ao adicionar amigo:', error);
      toast.error('Erro ao adicionar amigo.');
    }
  };

  // Função para remover um amigo usando o email
  removeFriend = async (friendEmail) => {
    const { userEmail } = this.state;

    if (!friendEmail) {
      toast.error('Não foi possível identificar o email do amigo.');
      return;
    }

    try {
      console.log('Tentando remover amizade com emailCliente1:', userEmail, ', emailCliente2:', friendEmail);
      const response = await axios.delete(`${API_BASE_URL}/api/amizades/delete`, {
        params: { emailCliente1: userEmail, emailCliente2: friendEmail },
      });
      console.log('Amizade removida com sucesso:', response.data);
      toast.success('Amizade removida com sucesso!');
      this.fetchFriends(); // Atualiza a lista de amigos após a remoção
    } catch (error) {
      console.error('Erro ao remover amigo:', error);
      toast.error('Erro ao remover amigo.');
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { friends, emailToAdd } = this.state;

    const formatPoints = (points) => {
      return points.toLocaleString('pt-BR'); // Formata os pontos como número brasileiro
    };

    return (
      <>
        <UserNavbar />
        <div className="container mt-5">
          <h2 className="text-center">Amigos</h2>

          {/* Formulário para adicionar amigos */}
          <div className="card p-3 mb-4">
            <h4>Adicionar Amigo</h4>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Digite o e-mail do amigo"
                name="emailToAdd"
                value={emailToAdd}
                onChange={this.handleChange}
              />
              <button className="btn btn-primary" onClick={this.addFriend}>
                Adicionar Amigo
              </button>
            </div>
          </div>

          {/* Lista de amigos exibida como cartões */}
          <div className="row">
            {friends.map((friend, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-secondary mb-3" style={{ maxWidth: '20rem' }}>
                  <div className="card-header">
                    {friend.nome || 'Amigo Anônimo'} {/* Nome do amigo */}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Pontos: {formatPoints(friend.totalPoints)}</h5> {/* Pontos formatados */}
                    <button
                      className="btn btn-danger"
                      onClick={() => this.removeFriend(friend.email)} // Envia o email correto
                    >
                      Remover Amigo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ToastContainer />
        </div>
      </>
    );
  }
}

export default withNavigate(UserFriendships);
