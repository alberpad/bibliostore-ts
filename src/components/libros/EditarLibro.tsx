import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ILibro, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

export interface IEditarLibroProps extends RouteComponentProps<{ id: string }> {
  libro: ILibro;
  firestore: any;
}
export interface IEditarLibroState extends ILibro {}

class EditarLibro extends React.Component<
  IEditarLibroProps,
  Partial<IEditarLibroState>
> {
  constructor(props: IEditarLibroProps) {
    super(props);
    this.state = {
      titulo: props.libro.titulo,
      autor: props.libro.autor,
      editorial: props.libro.editorial,
      existencias: props.libro.existencias,
      id: props.libro.id,
      prestados: props.libro.prestados,
      isbn: props.libro.isbn
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const libroActualizado = { ...this.state };
    const { firestore, history } = this.props;
    firestore
      .update(
        { collection: "libros", doc: libroActualizado.id },
        libroActualizado
      )
      .then(() => {
        history.push("/libros");
      });
  };

  public render() {
    if (!this.props.libro) return <Spinner />;
    const { titulo, autor, editorial, existencias, isbn } = this.state;
    let _existencias;
    if (!existencias) {
      _existencias = "";
    } else _existencias = existencias.toString();
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
            Editar Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Título del libro"
                    onChange={this.handleOnChange}
                    //value={suscriptor.nombre} // Not Controlled Component, no se puede modidificar por el usuario
                    defaultValue={titulo} // React Controlled component, si se puede modificar por el usuario
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Autor:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="autor"
                    placeholder="Autor del libro"
                    onChange={this.handleOnChange}
                    defaultValue={autor}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Editorial:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial del libro"
                    onChange={this.handleOnChange}
                    defaultValue={editorial}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ISBN:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="isbn"
                    placeholder="ISBN del libro"
                    onChange={this.handleOnChange}
                    defaultValue={isbn}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Existencias:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="existencias"
                    placeholder="Existencias del libro"
                    onChange={this.handleOnChange}
                    defaultValue={_existencias}
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

export default compose<React.FunctionComponent<IEditarLibroProps>>(
  firestoreConnect((props: IEditarLibroProps) => [
    {
      collection: "libros",
      storeAs: "libro", //alias para evitar que se sobreescriba suscriptores del state
      doc: props.match.params.id
    }
  ]),
  connect((state: IState, props) => ({
    libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0] //este ordered.suscriptor es por el alia porque en realiad retorna suscriptores pero con uno solo
  }))
)(EditarLibro);
