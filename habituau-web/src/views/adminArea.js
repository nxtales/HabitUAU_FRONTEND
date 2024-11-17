import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../components/adminNavBar';
import GrafanaEmbed from '../components/GrafanaEmbed';

document.body.style.backgroundColor = '#fffbf8';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class AdminArea extends Component {
  render() {
    const { navigate } = this.props;
    
    // Recupera os dados do admin do localStorage
    const adminData = JSON.parse(localStorage.getItem('adminData')) || {};
    const adminName = adminData.nome || 'Admin'; // Nome do admin, ou "Admin" como fallback

    return (
      <>
        <AdminNavBar />
        <br />
        <div className="container text-center mt-4">
          <h2>Olá {adminName} 👋</h2> {/* Exibe o nome do admin */}
          <p>Selecione na navbar o recurso que deseja gerenciar.</p>
        </div>
        
      </>
    );
  }
}

export default withNavigate(AdminArea);
