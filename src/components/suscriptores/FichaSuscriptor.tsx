import * as React from "react";
import { ISuscriptor } from "../../store/types";

export interface IFichaSuscriptorProps {
  alumno: Partial<ISuscriptor>;
}

export function FichaSuscriptor(props: IFichaSuscriptorProps) {
  const { alumno } = props;
  return (
    <div className="card my-3">
      <h3 className="card-header bg-primary text-white">Datos Solicitante</h3>
      <div className="card-body">
        <p className="font-weight-bold">
          Nombre:
          <span className="font-weight-normal">{` ${alumno.nombre}`}</span>
        </p>
        <p className="font-weight-bold">
          Carrera:
          <span className="font-weight-normal">{` ${alumno.carrera}`}</span>
        </p>
        <p className="font-weight-bold">
          Código:
          <span className="font-weight-normal">{` ${alumno.codigo}`}</span>
        </p>
      </div>
    </div>
  );
}
