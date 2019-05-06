import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "firebase/app";
import "firebase/auth"; //Habilida la autenticación de firebase en al aplicación
import "firebase/firestore";
import { FIREBASE_CONFIG } from "../datasecure";
import { IState } from "./types";
//CUSTOMS REDUCERS
import buscarUsuarioReducer from "./reducers/buscarUsuarioReducer";

// CONFIGURACIÓN DE FIRESTORE
// const firebaseConfig = FIREBASE_CONFIG;

// INICIALIZAR FIREBASE
firebase.initializeApp(FIREBASE_CONFIG);

// CONFIGURACIÓN REACT-REDUX-FIRESTORE
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// CREAR EL ENHANCER CON COMPOSE DE REDUX Y FIRESTORE
// TODO: Porque funciona con <React.ComponentClass>
const createStoreWithFirebase = compose<React.ComponentClass>(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// REDUCERS
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  suscriptor: buscarUsuarioReducer
});

// STATE INICIAL
const initialState = {};

// CREAR EL STORE
// @ts-ignore //TODO:
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  //@ts-ignore //TODO:
  composeWithDevTools(reactReduxFirebase(firebase))
);

export default store;
