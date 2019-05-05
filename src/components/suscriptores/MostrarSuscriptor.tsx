import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ISuscriptor, IState } from "../../store/types";
import { RouteComponentProps, Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import BtnVolverAlListado from "../layout/buttons/BtnVolverAlListado";

interface IMostrarSuscriptorProps extends RouteComponentProps<{ id: string }> {
  suscriptor: ISuscriptor;
}

const MostrarSuscriptor: React.FunctionComponent<
  IMostrarSuscriptorProps
> = props => {
  const { suscriptor } = props;
  if (!suscriptor) return <Spinner />;
  return (
    <div className="row">
      {/* <div className="col-md-6">
        <Link
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-success float-right"
        >
          <i className="fas fa-edit mr-2" />
          Editar Suscriptor
        </Link>
      </div> */}
      <div className="col-md-12 mb-4">
        <BtnVolverAlListado path="/suscriptores" />
        <Link
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-success ml-4"
        >
          <i className="fas fa-edit mr-2" />
          Editar Suscriptor
        </Link>
      </div>
      <div className="col-12">
        <h2 className="mb-4">
          {suscriptor.nombre} {suscriptor.apellido}
        </h2>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Carrera:</span>
          {suscriptor.carrera}
        </p>
        <p className="ml-4">
          <span className="font-weight-bold mr-2">Código:</span>
          {suscriptor.codigo}
        </p>
      </div>

      {/* <div className="col-md-6 mb-4">
        <Link to="/suscriptores" className="btn btn-primary mt-4">
          <i className="fas fa-arrow-circle-left mr-2" />
          Volver al listado
        </Link>
      </div> */}
    </div>
  );
};

export default compose<React.FunctionComponent<IMostrarSuscriptorProps>>(
  firestoreConnect((props: IMostrarSuscriptorProps) => [
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
)(MostrarSuscriptor);
