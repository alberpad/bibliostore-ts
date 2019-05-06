import { BUSCAR_USUARIO, TActionsTypes } from "../actions/types";
import { ISuscriptor } from "../types";

const initialState: ISuscriptor = {
  apellido: "",
  carrera: "",
  codigo: "",
  nombre: "",
  id: ""
};

export default function(state = initialState, action: TActionsTypes) {
  switch (action.type) {
    case BUSCAR_USUARIO:
      return {
        ...state,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        codigo: action.payload.codigo,
        carrera: action.payload.carrera,
        id: action.payload.id
      };

    default:
      return state;
  }
}
