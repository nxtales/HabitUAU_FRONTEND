import React from 'react'

class Landingpage extends React.Component{
    render(){
      return(
        <>
          <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Navbar</a>
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
                    <a className="nav-link active" href="#">
                      Home
                      <span className="visually-hidden">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown
                    </a>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                  </li>
                </ul>
                <form className="d-flex">
                  <input className="form-control me-sm-2" type="search" placeholder="Search" />
                  <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
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

export default Landingpage