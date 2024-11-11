import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskListExhibit from '../components/challengeTasksExhibit';
import UserNavbar from '../components/userNavbar';

document.body.style.backgroundColor = '#fffbf8';

// Função de wrapper para usar o hook `useNavigate` em um componente de classe
function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class UserArea extends Component {
  render() {
    const { navigate } = this.props;
    
    // Recupera o CPF do localStorage
    const cpf = localStorage.getItem('cpf');

    return (
      <>
        <UserNavbar />
        <br />
        {/* Passa o CPF como prop para TaskListExhibit */}
        <TaskListExhibit cpf={cpf} /> 
      </>
    );
  }
}

const ProgressBar = ({ progress, label }) => (
  <div>
    <div style={styles.progressBar}>
      <div style={{ ...styles.progressBarFill, width: `${progress}%` }}></div>
    </div>
    <p>{label}</p>
  </div>
);

const rankingData = [
  { name: 'Natalia Johnson', image: 'https://i.imgur.com/i3N3gY3.jpg', points: 150 },
  { name: 'Lucas Silva', image: 'https://i.imgur.com/2Z5g5gD.jpg', points: 120 },
  { name: 'Maria Oliveira', image: 'https://i.imgur.com/3J63P7G.png', points: 100 },
];

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  left: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    width: '400px',
  },
  right: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    width: '400px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  logo: {
    width: '40px',
    height: '40px',
  },
  headerTitle: {
    color: '#389774',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  challengeTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#389774',
  },
  challengeInfo: {
    marginBottom: '20px',
  },
  progressBar: {
    height: '15px',
    backgroundColor: '#eee',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '10px',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#389774',
  },
  button: {
    backgroundColor: '#f78181',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#db6161',
  },
  rankingTitle: {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#389774',
  },
  rankingList: {
    listStyleType: 'none',
    padding: 0,
  },
  rankingItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  rankingNumber: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  rankingName: {
    flexGrow: 1,
  },
  rankingPoints: {
    fontWeight: 'bold',
    color: '#f78181',
  },
};

export default withNavigate(UserArea);
