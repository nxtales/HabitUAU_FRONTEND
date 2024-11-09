import React from "react";
import UserRegisterForm from "../components/userRegisterForm";

class UserRegister extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#196e63', // Cor de fundo da página
          minHeight: '100vh', // Garante que a altura mínima seja 100% da tela
          display: 'flex',
          justifyContent: 'center', // Centraliza horizontalmente
          alignItems: 'center', // Centraliza verticalmente
          padding: 0,
          margin: 0,
        }}
      >
        <div className="card border-primary mb-3" style={{ maxWidth: '70%' }}>
          <div className="card-body">
             <img src="/assets/HABITUAU_LOGOLONGGREEN.png" alt="bug" height="100" style={{ maxWidth: "100%", height: "auto" }} />
            <p>Aqui você realiza seu cadastro na HabitUAU, uma plataforma pensada para te ajudar a cumprir seus objetivos e transformar hábitos em conquistas. Com o apoio da gamificação e das ferramentas de acompanhamento, você tem tudo o que precisa para se manter motivado e no controle do seu progresso. Não importa qual seja seu objetivo, a HabitUAU está ao seu lado, incentivando você a alcançar o melhor de si mesmo. Comece agora e dê o primeiro passo para tornar seus objetivos uma realidade!</p>
            <div className="container">
              <div className="mdc-card">
                <UserRegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegister;
