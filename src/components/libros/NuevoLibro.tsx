import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";

import BtnVolverAlListado from "../layout/buttons/BtnVolverAlListado";
import { ILibro } from "../../store/types";
import { BtnGuardarFormulario } from "../layout/buttons/BtnGuardarFormulario";
import { FormGroup } from "../layout/forms/FormGroup";

export interface INuevoLibroProps extends RouteComponentProps {
  firestore: any;
}

export interface INuevoLibroState extends ILibro {}

class NuevoLibro extends React.Component<
  INuevoLibroProps,
  Partial<INuevoLibroState>
> {
  constructor(props: INuevoLibroProps) {
    super(props);

    this.state = {
      autor: "",
      editorial: "",
      existencias: 0,
      isbn: "",
      titulo: "",
      prestados: []
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { existencias } = this.state;
    const libro = {
      ...this.state,
      existencias: Number(existencias),
      prestados: []
    };
    const { firestore, history } = this.props;
    firestore.add({ collection: "libros" }, libro).then(() => {
      history.push("/libros");
    });
  };

  public render() {
    const { autor, editorial, existencias, isbn, titulo } = this.state;
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <BtnVolverAlListado path="/" />
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book mr-2" />
            Nuevo Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.handleOnSubmit}>
                <FormGroup
                  label="Título:"
                  name="titulo"
                  value={titulo}
                  handleOnChange={this.handleOnChange}
                  placeholder="Título del libro"
                />
                <FormGroup
                  label="Autor:"
                  name="autor"
                  value={autor}
                  handleOnChange={this.handleOnChange}
                  placeholder="Autor del libro"
                />
                <FormGroup
                  label="Editorial:"
                  name="editorial"
                  value={editorial}
                  handleOnChange={this.handleOnChange}
                  placeholder="Editorial del libro"
                />
                <FormGroup
                  label="ISBN:"
                  name="isbn"
                  value={isbn}
                  handleOnChange={this.handleOnChange}
                  placeholder="ISBN del libro"
                />
                <FormGroup
                  label="Existencias:"
                  name="existencias"
                  value={existencias}
                  handleOnChange={this.handleOnChange}
                  placeholder="Existencias del libro"
                />
                <BtnGuardarFormulario />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(NuevoLibro);
