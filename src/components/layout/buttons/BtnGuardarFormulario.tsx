import * as React from "react";

export interface IBtnGuardarFormularioProps {}

export function BtnGuardarFormulario(props: IBtnGuardarFormularioProps) {
  return (
    <button type="submit" className="btn btn-primary btn-block">
      <i className="fas fa-save mr-2" />
      Guardar
    </button>
  );
}
