import { BUSCAR_USUARIO, TActionsTypes } from "./types";
import { ISuscriptor } from "../types";

export const buscarUsuario = (usuario: ISuscriptor): TActionsTypes => {
  return {
    type: "BUSCAR_USUARIO",
    payload: usuario
  };
};
