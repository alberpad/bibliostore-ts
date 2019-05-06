export interface IState {
  firestore: IFirestore;
  firebase: IFirebase;
  suscriptor: ISuscriptor;
}

interface IFirestore {
  status: any;
  data: any;
  ordered: any;
  listeners: any;
  errors: any;
  queries: any;
}

interface IFirebase {
  requesting: any;
  requested: any;
  timestamps: any;
  data: any;
  ordered: any;
  auth: any;
  authError: any;
  profile: any;
  listeners: any;
  isInitializing: any;
  error: any;
}

export interface ISuscriptor {
  id: string;
  nombre: string;
  apellido: string;
  carrera: string;
  codigo: string;
}

export interface ILibro {
  id: string;
  isbn: string;
  autor: string;
  titulo: string;
  existencias: number;
  prestados: IPrestamoLibro[];
  editorial: string;
}

export interface IPrestamoLibro {
  suscriptor: ISuscriptor;
  fecha_solicitud: string;
}
