import React from "react";
import LoginForm from "../components/userLoginForm";

class UserLogin extends React.Component {
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
            <p></p>
            <div className="container">
              <div className="mdc-card">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLogin;
