import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "firebase/app";
import "firebase/firestore";

// CONFIGURACIÓN DE FIRESTORE
const firebaseConfig = {
  apiKey: "AIzaSyDp-oo5dLfNY22sIZHnDjhTonnhq1RABbk",
  authDomain: "bibliostore-1857e.firebaseapp.com",
  databaseURL: "https://bibliostore-1857e.firebaseio.com",
  projectId: "bibliostore-1857e",
  storageBucket: "bibliostore-1857e.appspot.com",
  messagingSenderId: "835329418085",
  appId: "1:835329418085:web:359848f04b4deddb"
};

// INICIALIZAR FIREBASE
firebase.initializeApp(firebaseConfig);

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
  firestore: firestoreReducer
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