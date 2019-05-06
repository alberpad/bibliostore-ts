import React from "react";
import { firebaseConnect } from "react-redux-firebase";
import { RouteComponentProps } from "react-router-dom";
import Swal from "sweetalert2";

export interface ILoginProps extends RouteComponentProps {
  firebase: any;
}

export interface ILoginState {
  email: string;
  password: string;
}

class Login extends React.Component<ILoginProps, Partial<ILoginState>> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleOnSubmitIniciarSesion = (e: React.FormEvent) => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;
    firebase
      .login({
        email,
        password
      })
      .then((resultado: any) => this.props.history.push("/"))
      .catch((error: any) => {
        Swal.fire({
          type: "error",
          title: "Error de validación",
          text: "Usuario o contraseña incorrectos!",
          footer: "<a href>¿Ha olvidado la contraseña?</a>"
        });
      });
  };
  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  public render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <i className="fas fa-lock mr-2" />
                Iniciar Sesión
              </h2>
              <form onSubmit={this.handleOnSubmitIniciarSesion}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleOnChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-success btn-block"
                  value="Iniciar Sesión"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firebaseConnect()(Login);
