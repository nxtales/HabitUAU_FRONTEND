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
      emailToAdd: '', // Estado para armazenar o e-mail do amigo a ser adicionado
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
      console.error("Erro ao buscar e-mail do usuário:", error);
      toast.error("Erro ao obter e-mail do usuário.");
    }
  };

  // Função para buscar a lista de amizades
  fetchFriends = async () => {
    const cpf = localStorage.getItem('cpf');
    if (!cpf) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/api/amizades/cliente/${cpf}`);
      const friendsData = response.data;

      // Obtém os pontos para cada amigo
      const friendsWithPoints = await Promise.all(
        friendsData.map(async (friend) => {
          const pointsResponse = await axios.get(`${API_BASE_URL}/api/challenges/getuserchallengetasks`, {
            params: { cpf: friend.cpfAmigo },
          });

          const totalPoints = pointsResponse.data.reduce((sum, task) => {
            return sum + (task.completed ? task.points : 0);
          }, 0);

          return {
            ...friend,
            totalPoints,
          };
        })
      );

      this.setState({ friends: friendsWithPoints });
    } catch (error) {
      console.error("Erro ao buscar amigos:", error);
      toast.error("Erro ao carregar lista de amigos.");
    }
  };

  // Função para adicionar um novo amigo
  addFriend = async () => {
    const { userEmail, emailToAdd } = this.state;

    if (!emailToAdd) {
      toast.error("Digite um e-mail válido para adicionar um amigo.");
      return;
    }

    try {
      console.log("Tentando adicionar amigo com emailCliente1:", userEmail, ", emailCliente2:", emailToAdd);
      const response = await axios.post(
        `${API_BASE_URL}/api/amizades/create`,
        null,
        { params: { emailCliente1: userEmail, emailCliente2: emailToAdd } }
      );
      console.log("Amizade criada com sucesso:", response.data);
      toast.success("Amigo adicionado com sucesso!");
      this.fetchFriends(); // Atualiza a lista de amigos após a adição
    } catch (error) {
      console.error("Erro ao adicionar amigo:", error);
      toast.error("Erro ao adicionar amigo.");
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { friends, emailToAdd } = this.state;

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
            {friends.map((friend) => (
              <div className="col-md-4" key={friend.id}>
                <div className="card border-secondary mb-3" style={{ maxWidth: "20rem" }}>
                  <div className="card-header">
                    {friend.nome} {friend.sobrenome}
                  </div>
                  <div className="card-body">
                    {friend.foto ? (
                      <img src={friend.foto} alt="Foto do Amigo" className="img-fluid mb-3 rounded-circle" />
                    ) : (
                      <div className="placeholder bg-secondary mb-3" style={{ width: '100%', height: '150px' }} />
                    )}
                    <h5 className="card-title">Pontos: {friend.totalPoints}</h5>
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
