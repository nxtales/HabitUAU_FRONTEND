import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar';
import UserEditForm from '../components/userEditForm';

document.body.style.backgroundColor = '#fffbf8';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class userAccount extends Component {

  render() {

    return (
      <>
        <UserNavbar />
        <br></br>
        <UserEditForm></UserEditForm>
      </>
    );
  }
}

export default withNavigate(userAccount);
