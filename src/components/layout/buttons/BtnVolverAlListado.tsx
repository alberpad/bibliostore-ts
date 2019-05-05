import * as React from "react";
import { Link } from "react-router-dom";

export interface IBtnVolverAlListadoProps {
  path: string;
  text?: string;
}

function BtnVolverAlListado(props: IBtnVolverAlListadoProps) {
  return (
    <Link to={props.path} className="btn btn-primary mx-2">
      <i className="fas fa-arrow-circle-left mr-2" />
      {props.text || "Volver al listado"}
    </Link>
  );
}

export default BtnVolverAlListado;
