export interface IState {
  firestore: IFirestore;
  firebase: IFirebase;
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
