import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ISuscriptor, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

interface IEditarSuscriptorProps extends RouteComponentProps<{ id: string }> {
  suscriptor: ISuscriptor;
  firestore: any;
}
interface IEditarSuscriptorState {
  nombre: string;
  apellido: string;
  carrera: string;
  codigo: string;
  id: string;
}

class EditarSuscriptor extends React.Component<
  IEditarSuscriptorProps,
  Partial<IEditarSuscriptorState>
> {
  constructor(props: IEditarSuscriptorProps) {
    super(props);
    this.state = {
      nombre: props.suscriptor.nombre,
      apellido: props.suscriptor.apellido,
      carrera: props.suscriptor.carrera,
      codigo: props.suscriptor.codigo
      // id: props.suscriptor.id
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suscriptorActualizado = { ...this.state };
    const { firestore, history, match } = this.props;
    firestore
      .update(
        { collection: "suscriptores", doc: match.params.id },
        suscriptorActualizado
      )
      .then(() => {
        history.push("/suscriptores");
      });
  };

  public render() {
    if (!this.props.suscriptor) return <Spinner />;
    const { nombre, apellido, carrera, codigo } = this.state;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={`/suscriptores`} className="btn btn-primary">
            <i className="fas fa-arrow-circle-left mr-2" />
            Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-edit mr-2" />
            Editar Suscriptor
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
                    //value={suscriptor.nombre} // Not Controlled Component, no se puede modidificar por el usuario
                    defaultValue={nombre} // React Controlled component, si se puede modificar por el usuario
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
                    defaultValue={apellido}
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
                    defaultValue={carrera}
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
                    defaultValue={codigo}
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

export default compose<React.FunctionComponent<IEditarSuscriptorProps & any>>(
  firestoreConnect((props: IEditarSuscriptorProps) => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor", //alias para evitar que se sobreescriba suscriptores del state
      doc: props.match.params.id
    }
  ]),
  connect((state: IState, props) => ({
    suscriptor:
      state.firestore.ordered.suscriptor &&
      state.firestore.ordered.suscriptor[0] //este ordered.suscriptor es por el alia porque en realiad retorna suscriptores pero con uno solo
  }))
)(EditarSuscriptor);
