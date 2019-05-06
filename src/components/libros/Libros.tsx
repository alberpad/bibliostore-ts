import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ILibro, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

export interface ILibrosProps extends RouteComponentProps {
  libros: ILibro[];
  firestore: any;
  // redirect: any;
  // redirectPath: any;
  // isAuthenticated: any;
  // isAuthenticating: any;
}

class Libros extends React.Component<ILibrosProps> {
  render() {
    const { libros, firestore } = this.props;

    if (!libros) return <Spinner />;

    const handleOnClickEliminarLibro = (id: string) => {
      Swal.fire({
        title: "¿Está seguro?",
        text: "Los cambios serán definitivos",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Estoy seguro!",
        cancelButtonText: "No estoy seguro"
      }).then(result => {
        if (result.value) {
          firestore
            .delete({
              collection: "libros",
              doc: id
            })
            .then(() => {
              Swal.fire("¡Borrado!", "El libro ha sido borrado", "success");
            });
        }
      });
    };

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/libros/nuevo" className="btn btn-success">
            <i className="fas fa-plus mr-2" />
            Nuevo Libro
          </Link>
        </div>
        <div className="col-md-8">
          <h2>
            <i className="fas fa-book mr-2" />
            Libros
          </h2>
        </div>

        <table className="table table-striped mt-4">
          <thead className="text-light bg-primary">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Editorial</th>
              <th className="text-center">Existencias</th>
              <th className="text-center">Disponibles</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro: ILibro) => (
              <tr key={libro.id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.isbn}</td>
                <td>{libro.editorial}</td>
                <td className="text-center">{libro.existencias}</td>
                <td className="text-center">
                  {libro.existencias - libro.prestados.length}
                </td>
                <td>
                  <Link
                    to={`/libros/mostrar/${libro.id}`}
                    className="btn btn-success btn-block"
                  >
                    <i className="fas fa-eye mr-2" />
                    Más Información
                  </Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      handleOnClickEliminarLibro(libro.id);
                    }}
                    type="button"
                    className="btn btn-danger btn-block"
                  >
                    <i className="fas fa-trash-alt mr-2" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default compose<React.ComponentClass<ILibrosProps & any>>(
  firestoreConnect([{ collection: "libros" }]), //Crea un HOC, inyecta firestore
  connect((state: IState, props) => ({
    libros: state.firestore.ordered.libros
  }))
)(Libros);
