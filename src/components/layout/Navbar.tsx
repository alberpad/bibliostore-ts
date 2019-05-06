import React from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { IState } from "../../store/types";

export interface INavbarProps {
  auth: any;
  firebase: any;
}

export interface INavbarState {
  usuarioAutenticado: boolean;
}

class Navbar extends React.Component<INavbarProps, INavbarState> {
  constructor(props: INavbarProps) {
    super(props);

    this.state = {
      usuarioAutenticado: false
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { auth } = nextProps;
    if (auth.uid) {
      return { usuarioAutenticado: true };
    } else {
      return { usuarioAutenticado: false };
    }
  }

  handleOnClickCerrarSesion = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  public render() {
    const { usuarioAutenticado } = this.state;
    const { auth } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
          <nav className="navbar navbar-light">
            <span className="navbar-brand mb-0 h1">
              Administrador de Biblioteca
            </span>
          </nav>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            {usuarioAutenticado ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/suscriptores"} className="nav-link">
                    Suscriptores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/libros"} className="nav-link">
                    Libros
                  </Link>
                </li>
              </ul>
            ) : null}
            {usuarioAutenticado ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nave-item">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.handleOnClickCerrarSesion}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </div>
    );
  }
}

export default compose<React.FunctionComponent>(
  firebaseConnect(),
  connect((state: IState, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
