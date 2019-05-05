import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ILibro, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import BtnVolverAlListado from "../layout/buttons/BtnVolverAlListado";

interface IMostrarLibroProps extends RouteComponentProps<{ id: string }> {
  libro: ILibro;
}

const MostrarLibro: React.FunctionComponent<IMostrarLibroProps> = props => {
  const { libro } = props;
  if (!libro) return <Spinner />;
  let btnPrestamo = null;
  if (libro.existencias - libro.prestados.length > 0) {
    btnPrestamo = (
      <Link
        to={`/libros/prestamo/${libro.id}`}
        className="btn btn-success my-3 mx-2"
      >
        <i className="fas fa-calendar mr-2" />
        Solicitar Préstamo
      </Link>
    );
  }
  return (
    <div className="row">
      {/* <div className="col-md-6">
        <Link
          to={`/Libroes/editar/${Libro.id}`}
          className="btn btn-success float-right"
        >
          <i className="fas fa-edit mr-2" />
          Editar Libro
        </Link>
      </div> */}
      <div className="col-md-12 mb-4">
        <BtnVolverAlListado path="/libros" />
        <Link
          to={`/libros/editar/${libro.id}`}
          className="btn btn-success mx-2"
        >
          <i className="fas fa-edit mr-2" />
          Editar Libro
        </Link>
        {btnPrestamo}
      </div>
      <div className="col-12">
        <h2 className="mb-4">{libro.titulo}</h2>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Autor:</span>
          {libro.autor}
        </p>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Editorial:</span>
          {libro.editorial}
        </p>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">ISBN:</span>
          {libro.isbn}
        </p>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Existencias:</span>
          {libro.existencias}
        </p>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Disponibles:</span>
          {libro.existencias - libro.prestados.length}
        </p>
      </div>

      {/* <div className="col-md-6 mb-4">
        <Link to="/Libroes" className="btn btn-primary mt-4">
          <i className="fas fa-arrow-circle-left mr-2" />
          Volver al listado
        </Link>
      </div> */}
    </div>
  );
};

export default compose<React.FunctionComponent<IMostrarLibroProps>>(
  firestoreConnect((props: IMostrarLibroProps) => [
    {
      collection: "libros",
      storeAs: "libro", //alias para evitar que se sobreescriba Libroes del state
      doc: props.match.params.id
    }
  ]),
  connect((state: IState, props) => ({
    libro: state.firestore.ordered.libro && state.firestore.ordered.libro[0] //este ordered.Libro es por el alia porque en realiad retorna Libroes pero con uno solo
  }))
)(MostrarLibro);
