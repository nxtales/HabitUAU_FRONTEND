import React from 'react';
import { useNavigate } from 'react-router-dom';

function withNavigate(Component) {
    return function WrapperComponent(props) {
      const navigate = useNavigate();
      return <Component {...props} navigate={navigate} />;
    };
}

const AdminNavbar = ({ navigate }) => {
    return (
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#/adminArea">
            <img
              src="/assets/HABITUAU_LOGOLONG.png"
              alt="Logo"
              height="40"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <h1 className='text-center'>CORPORATIVO</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="#/viewFiliais">
                  Filiais
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/viewAdmins">
                 Admins 
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/viewPartners">
                  Parceiros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/viewCategories">
                  Segmentos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/viewChallenges">
                  Desafios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/viewChallengeTasks">
                  Tarefas
                </a>
              </li>
            </ul>
            <button
              className="btn btn-secondary my-2 my-sm-0"
              onClick={() => navigate('/LandingPage')}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
};

export default withNavigate(AdminNavbar);
