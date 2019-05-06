import { ISuscriptor } from "../types";

export const BUSCAR_USUARIO = "BUSCAR_USUARIO";

interface IActionBuscarUsuario {
  type: typeof BUSCAR_USUARIO;
  payload: ISuscriptor;
}

export type TActionsTypes = IActionBuscarUsuario;
