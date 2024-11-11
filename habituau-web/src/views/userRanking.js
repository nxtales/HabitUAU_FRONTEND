import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';
import RankingCard from '../components/rankingCard';

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
      // Fetch geral ranking
      const generalResponse = await axios.get(
        'https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/ranking/geral'
      );
      const sortedGeneralRanking = generalResponse.data
        .sort((a, b) => b.points - a.points) // Ordena por pontos em ordem decrescente
        .slice(0, 5); // Obtém os top 5

      // Fetch user-specific ranking for maior pontuação em desafio
      const userResponse = await axios.get(
        `https://habituau-dev-f2breaambnduhpaw.canadacentral-01.azurewebsites.net/api/ranking/pordesafio/${userCPF}`
      );

      const userChallengeRanking = userResponse.data || null;
      const userIsInTop5 = sortedGeneralRanking.some((user) => user.cpf === userCPF);

      // Se o usuário não estiver no top 5, determine a posição e pontos
      let userPosition = null;
      let userPoints = null;

      if (!userIsInTop5 && userChallengeRanking) {
        const fullRanking = generalResponse.data.sort((a, b) => b.points - a.points);
        const userIndex = fullRanking.findIndex((user) => user.cpf === userCPF);

        if (userIndex !== -1) {
          userPosition = userIndex + 1;
          userPoints = fullRanking[userIndex].points;
        }
      }

      this.setState({
        generalRanking: sortedGeneralRanking,
        userChallengeRanking,
        userPosition,
        userPoints,
      });
    } catch (error) {
      console.error("Erro ao buscar rankings:", error);
    }
  };

  render() {
    const { generalRanking, userChallengeRanking, userPosition, userPoints } = this.state;

    return (
      <>
        <UserNavbar />
        <div className="container mt-5">
          <div className="row">
            <h3 className="text-center">Ranking Geral</h3>
            <RankingCard rankingData={generalRanking} />

            <h3 className="text-center mt-4">Maior Pontuação no Desafio</h3>
            {userChallengeRanking ? (
              <RankingCard rankingData={[userChallengeRanking]} />
            ) : (
              <p className="text-center">Nenhuma pontuação registrada para o desafio.</p>
            )}
          </div>

          {userPosition && (
            <div className="mt-4 text-center">
              <p>Sua posição: {userPosition}º com {userPoints} pontos.</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withNavigate(UserRanking);
