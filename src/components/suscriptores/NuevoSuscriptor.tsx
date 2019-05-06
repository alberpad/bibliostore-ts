import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import BtnVolverAlListado from "../layout/buttons/BtnVolverAlListado";
import { ISuscriptor } from "../../store/types";

interface INuevoSuscriptorProps extends RouteComponentProps {
  firestore: any;
}

// interface INuevoSuscriptorState {
//   nombre: string;
//   apellido: string;
//   carrera: string;
//   codigo: string;
// }

interface INuevoSuscriptorState extends ISuscriptor {}

class NuevoSuscriptor extends React.Component<
  INuevoSuscriptorProps & RouteComponentProps,
  Partial<INuevoSuscriptorState>
> {
  constructor(props: INuevoSuscriptorProps) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      carrera: "",
      codigo: ""
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suscriptor = { ...this.state };
    const { firestore, history } = this.props;
    firestore.add({ collection: "suscriptores" }, suscriptor).then(() => {
      history.push("/suscriptores");
    });
  };

  public render() {
    const { nombre, apellido, carrera, codigo } = this.state;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <BtnVolverAlListado path="/suscriptores" />
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus mr-2" />
            Nuevo Suscriptor
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre del suscriptor"
                    onChange={this.handleOnChange}
                    value={nombre}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Apellido del suscriptor"
                    onChange={this.handleOnChange}
                    value={apellido}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Carrera:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="carrera"
                    placeholder="Carrera del suscriptor"
                    onChange={this.handleOnChange}
                    value={carrera}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Código:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="codigo"
                    placeholder="Código del suscriptor"
                    onChange={this.handleOnChange}
                    value={codigo}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  <i className="fas fa-save mr-2" />
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(NuevoSuscriptor);
