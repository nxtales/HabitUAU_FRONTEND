import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';

document.body.style.backgroundColor = '#fffbf8';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class UserRanking extends Component {
  state = {
    generalRanking: [],
    userChallengeRanking: null,
    userCPF: localStorage.getItem('cpf'),
    userPosition: null,
    userPoints: null,
  };

  componentDidMount() {
    this.fetchRankings();
  }

  fetchRankings = async () => {
    const { userCPF } = this.state;

    try {
      // Fetch ranking geral
      const generalResponse = await axios.get(
        'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/ranking/geral'
      );

      const sortedGeneralRanking = generalResponse.data
        .sort((a, b) => b.pontos - a.pontos)
        .slice(0, 5); // Top 5

      // Fetch ranking por desafio do usuário
      const userResponse = await axios.get(
        `https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/ranking/pordesafio/${userCPF}`
      );

      const userChallengeRanking = userResponse.data || null;

      // Verifica se o usuário está no top 5
      const userIsInTop5 = sortedGeneralRanking.some(
        (user) => user.cpfCliente === userCPF
      );

      // Calcula posição e pontos caso o usuário não esteja no top 5
      let userPosition = null;
      let userPoints = null;

      if (!userIsInTop5 && userChallengeRanking) {
        const fullRanking = generalResponse.data.sort((a, b) => b.pontos - a.pontos);
        const userIndex = fullRanking.findIndex((user) => user.cpfCliente === userCPF);

        if (userIndex !== -1) {
          userPosition = userIndex + 1;
          userPoints = fullRanking[userIndex].pontos;
        }
      }

      this.setState({
        generalRanking: sortedGeneralRanking,
        userChallengeRanking,
        userPosition,
        userPoints,
      });
    } catch (error) {
      console.error('Erro ao buscar rankings:', error);
    }
  };

  render() {
    const { generalRanking, userChallengeRanking, userPosition, userPoints } = this.state;

    // Função para formatar pontos de maneira segura
    const formatPoints = (points) => {
      return points !== undefined && points !== null
        ? points.toLocaleString('pt-BR')
        : '0'; // Retorna "0" caso os pontos sejam inválidos
    };

    return (
      <>
        <UserNavbar />
        <div className="container mt-5">
          <div className="row">
            <h3 className="text-center mb-4">Ranking Geral</h3>
            <div className="col-12">
              {generalRanking.length > 0 ? (
                <table className="table table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generalRanking.map((user, index) => (
                      <tr key={user.cpfCliente}>
                        <td>{index + 1}</td>
                        <td>{user.nomeCliente || 'Cliente Desconhecido'}</td>
                        <td>{formatPoints(user.pontos)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">Nenhum dado de ranking geral disponível.</p>
              )}
            </div>

            <h3 className="text-center mt-4">Maior Pontuação no Desafio</h3>
            <div className="col-12">
              {userChallengeRanking ? (
                <table className="table table-hover">
                  <thead className="table-primary">
                    <tr>
                      <th>Nome</th>
                      <th>Pontos</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{userChallengeRanking.nomeCliente || 'Cliente Desconhecido'}</td>
                      <td>{formatPoints(userChallengeRanking.pontos)}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-center">Nenhuma pontuação registrada para o desafio.</p>
              )}
            </div>
          </div>

          {userPosition && (
            <div className="mt-4 text-center">
              <p>
                Sua posição: <strong>{userPosition}º</strong> com{' '}
                <strong>{formatPoints(userPoints)}</strong> pontos.
              </p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withNavigate(UserRanking);
