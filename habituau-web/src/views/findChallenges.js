import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';
import ChallengeCardExhibit from '../components/challengeCardExhibit';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class FindChallenges extends Component {
  state = {
    challenges: [],
  };

  componentDidMount() {
    this.fetchChallenges();
  }

  fetchChallenges = async () => {
    try {
      const response = await axios.get(
        'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/challenges/find',
        { params: { searchString: '' } }
      );

      console.log("API response data:", response.data); // Log para verificar os dados recebidos

      // Normaliza os dados para o componente filho
      const normalizedChallenges = response.data.map((challenge) => ({
        id: challenge.id,
        nome: challenge.nome || "Desafio sem nome",
        parceiroNome: challenge.parceiro?.nome || "Parceiro desconhecido",
        categoriaNome: challenge.categoria?.nome || "Categoria desconhecida",
      }));

      this.setState({ challenges: normalizedChallenges });
    } catch (error) {
      console.error("Erro ao buscar desafios:", error);
    }
  };

  handleEnroll = async (challengeId) => {
    const cpf = localStorage.getItem('cpf');
    if (!cpf) {
      alert('CPF não encontrado. Por favor, faça o login novamente.');
      return;
    }

    try {
      const response = await axios.post(
        'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/challenges/enroll',
        null,
        { params: { cpfCliente: cpf, idDesafio: challengeId } }
      );
      alert(response.data);
    } catch (error) {
      alert(
        error.response && error.response.data
          ? error.response.data
          : "Erro ao se inscrever no desafio."
      );
    }
  };

  render() {
    const { challenges } = this.state;

    return (
      <>
        <UserNavbar />
        <div className="container mt-5">
          <div className="row">
            {challenges.map((challenge) => (
              <ChallengeCardExhibit
                key={challenge.id}
                challenge={challenge}
                onEnroll={this.handleEnroll}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default withNavigate(FindChallenges);
