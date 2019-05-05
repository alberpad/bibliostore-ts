import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ILibro, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { ISuscriptor } from "../../store/types";
import { FichaSuscriptor } from "../suscriptores/FichaSuscriptor";

export interface IPrestamoLibroProps
  extends RouteComponentProps<{ id: string }> {
  libro: ILibro;
  firestore: any;
}

export interface IPrestamoLibroState {
  busqueda: string;
  suscriptor: Partial<ISuscriptor>;
  noSuscriptor: boolean;
}

class PrestamoLibro extends React.Component<
  IPrestamoLibroProps,
  Partial<IPrestamoLibroState>
> {
  constructor(props: IPrestamoLibroProps) {
    super(props);

    this.state = {
      noSuscriptor: false,
      busqueda: "",
      suscriptor: {}
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { busqueda } = this.state;
    const { firestore, history } = this.props;
    const coleccion = firestore.collection("suscriptores");
    const consulta = coleccion.where("codigo", "==", busqueda).get();
    consulta.then((resultado: any) => {
      if (resultado.empty) {
        this.setState({
          noSuscriptor: true,
          suscriptor: {}
        });
      } else {
        const datos = resultado.docs[0];
        console.log(datos.data());
        this.setState({
          noSuscriptor: false,
          suscriptor: datos.data()
        });
      }
    });
  };

  handleOnClickSolicitar = () => {
    const { suscriptor } = this.state;
  };

  public render() {
    const { libro } = this.props;
    if (!libro) return <Spinner />;
    const { noSuscriptor, suscriptor } = this.state;
    let fichaAlumno, btnSolicitar;
    if (suscriptor && suscriptor.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={suscriptor} />;
      btnSolicitar = (
        <button
          onClick={this.handleOnClickSolicitar}
          type="button"
          className="btn btn-primary btn-block"
        >
          Solicitar Préstamo
        </button>
      );
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={`/libros`} className="btn btn-primary">
            <i className="fas fa-arrow-circle-left mr-2" />
            Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-edit mr-2" />
            Solicitar Préstamo: {libro.titulo}
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={this.handleOnSubmit} className="mb-4">
                <legend className="color-primary text-center mt-5">
                  Busca el Suscriptor por Código
                </legend>
                <div className="form-group">
                  <input
                    type="text"
                    name="busqueda"
                    className="form-control"
                    onChange={this.handleOnChange}
                    placeholder="Código"
                    required
                  />
                </div>
                <input
                  value="Buscar Alumno"
                  type="submit"
                  className="btn btn-success btn-block"
                />
              </form>
              {fichaAlumno}
              {btnSolicitar}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose<React.FunctionComponent<IPrestamoLibroProps>>(
  firestoreConnect((props: IPrestamoLibroProps) => [
    {
      collection: "libros",
      storeAs: "libro", //alias para evitar que se sobreescriba suscriptores del state
      doc: props.match.params.id
    }
  ]),
  connect((state: IState, props) => ({
    libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0] //este ordered.suscriptor es por el alia porque en realiad retorna suscriptores pero con uno solo
  }))
)(PrestamoLibro);
