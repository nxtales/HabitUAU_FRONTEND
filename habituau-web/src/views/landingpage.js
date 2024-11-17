import React from 'react';
import { useNavigate } from 'react-router-dom';

function withNavigate(Component) {
  return function WrapperComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Landingpage extends React.Component {
  render() {
    const { navigate } = this.props;

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
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
              <img src="/assets/HABITUAU_LOGOLONG.png" alt="bug" height="100" style={{ maxWidth: "100%", height: "auto" }} />
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="LandingPage">
                    Home
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/adminLogin">Área do Colaborador</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="FaleConosco">Fale Conosco</a>
                </li>
              </ul>
              <button
                className="btn btn-primary my-2 my-sm-0"
                onClick={() => navigate('/userRegister')}
              >
                Cadastrar
              </button>
              <button 
                className="btn btn-secondary my-2 my-sm-0"
                onClick={() => navigate('/userLogin')}
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingTop: "56.2225%",
            paddingBottom: 0,
            boxShadow: "0 2px 8px 0 rgba(63, 69, 81, 0.16)",
            marginTop: "0",
            marginBottom: "0",
            overflow: "hidden",
            borderRadius: "8px",
            willChange: "transform"
          }}
        >
          <iframe
            loading="lazy"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              border: "none",
              padding: 0,
              margin: 0
            }}
            src="https://www.canva.com/design/DAGOz3AnA5k/_Wui125PFZGsQp28PCAetQ/view?embed"
            allowFullScreen
            allow="fullscreen"
          ></iframe>
        </div>
      </>
    );
  }
}

export default withNavigate(Landingpage);
