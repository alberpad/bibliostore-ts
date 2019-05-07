import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ILibro, IState } from '../../store/types';
import { RouteComponentProps, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { ISuscriptor, IPrestamoLibro } from '../../store/types';
import { FichaSuscriptor } from '../suscriptores/FichaSuscriptor';
import Swal from 'sweetalert2';
// REDUX ACTIONS
import { buscarUsuario } from '../../store/actions/buscarUsuarioActions';

export interface IPrestamoLibroProps
  extends RouteComponentProps<{ id: string }> {
  libro: ILibro;
  firestore: any;
  buscarUsuario: (usuario: ISuscriptor) => void;
  suscriptor: ISuscriptor;
}

export interface IPrestamoLibroState {
  busqueda: string;
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
      busqueda: ''
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
      // busqueda: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { busqueda } = this.state;
    const { firestore, buscarUsuario } = this.props;
    const coleccion = firestore.collection('suscriptores');
    const consulta = coleccion.where('codigo', '==', busqueda).get();

    consulta.then((resultado: any) => {
      if (resultado.empty) {
        buscarUsuario({
          apellido: '',
          carrera: '',
          codigo: '',
          nombre: '',
          id: ''
        });
        this.setState({
          noSuscriptor: true
        });
        Swal.fire({
          type: 'error',
          title: 'No Encontrado',
          text: 'El código no corresponde a ningún suscriptor'
        });
      } else {
        const id = resultado.docs[0].id;
        const suscriptor = resultado.docs[0].data();
        suscriptor.id = id;
        buscarUsuario(suscriptor);
        this.setState({
          noSuscriptor: false
        });
      }
    });
  };

  handleOnClickSolicitar = () => {
    const { suscriptor, firestore, history, match } = this.props;
    const prestamoLibro: IPrestamoLibro = {
      suscriptor,
      fecha_solicitud: new Date().toLocaleDateString()
    };

    // ASÍ DE ERROR: EL OBJETO NO ES EXTENSIBLE
    // ESTO ES POR LAS PROPS NO SE PUEDEN MUTAR
    // const { firestore, history, libro } = this.props;
    // libro.prestados.push(prestamoLibro);
    // SOLUCION: HACER UNA COPIA DEL ARREGLO PRESTADOS Y AÑADIR AHÍ

    let prestados = [];
    prestados = [...this.props.libro.prestados, prestamoLibro];
    const libro = { ...this.props.libro };
    delete libro.prestados;
    const id = libro.id;
    delete libro.id;
    libro.prestados = prestados;
    firestore
      .update(
        {
          collection: 'libros',
          doc: id
        },
        libro
      )
      .then(history.push('/libros'));
  };

  public render() {
    const { libro } = this.props;
    if (!libro) return <Spinner />;
    const { suscriptor } = this.props;

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

export default compose<React.FunctionComponent<IPrestamoLibroProps & any>>(
  firestoreConnect((props: IPrestamoLibroProps) => [
    {
      collection: 'libros',
      storeAs: 'libro', //alias para evitar que se sobreescriba libros del state
      doc: props.match.params.id
    }
  ]),
  connect(
    (state: IState, props) => ({
      libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0],
      suscriptor: state.suscriptor
    }),
    { buscarUsuario }
  )
)(PrestamoLibro);
