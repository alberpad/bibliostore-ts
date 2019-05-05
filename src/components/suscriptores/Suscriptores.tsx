import * as React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ISuscriptor, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Swal from "sweetalert2";

interface ISuscriptoresProps {
  suscriptores: ISuscriptor[];
  firestore: any;
}
type TCCSuscriptores = ISuscriptoresProps & RouteComponentProps;
// SUSCRIPTORES FUNCTION COMPONENT
const Suscriptores = (props: TCCSuscriptores) => {
  const { suscriptores, firestore } = props;

  const handleOnClickEliminarSuscriptor = (id: string) => {
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
            collection: "suscriptores",
            doc: id
          })
          .then(() => {
            Swal.fire("¡Borrado!", "El suscriptor ha sido borrado", "success");
          });
      }
    });
  };

  if (!suscriptores) return <Spinner />;
  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to="/suscriptores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus mr-1" />
          Nuevo Suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users" /> Suscriptores
        </h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(stor => (
            <tr key={stor.id}>
              <td>
                {stor.nombre} {stor.apellido}
              </td>
              <td>{stor.carrera}</td>
              <td>
                <Link
                  to={`/suscriptores/mostrar/${stor.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-eye mr-2" />
                  Más Información
                </Link>
                {/* Si hacemos onClick={handleOnClickEliminarSuscriptor(stor.id)} en TS da error y en JS llamará a la función tantas veces como suscriptores haya y no es lo que quermos */}
                {/* Para evitar multiples llamadas o poder pasar un parámetro usamos un arrow functino anonima */}
                {/* el arrow functin puede tener el evento o no */}
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleOnClickEliminarSuscriptor(stor.id);
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
};

// CONEXIÓN A FIRESTORE Y PASO DE PROPS CON REDUX CONNECT Y COMPOSE
// TIPADO >> https://stackoverflow.com/questions/50001344/using-react-redux-connect-with-typescript
export default compose<React.FunctionComponent<TCCSuscriptores>>(
  firestoreConnect([{ collection: "suscriptores" }]), //Crea un HOC, inyecta firestore
  connect((state: IState, props) => ({
    suscriptores: state.firestore.ordered.suscriptores
  }))
)(Suscriptores);
