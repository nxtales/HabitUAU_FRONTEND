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

class userFriendships extends Component {

  render() {

    return (
      <>
        <UserNavbar />
      </>
    );
  }
}

export default withNavigate(userFriendships);
