import * as React from "react";

export interface IPrestamoLibroProps {}

export interface IPrestamoLibroState {}

class PrestamoLibro extends React.Component<
  IPrestamoLibroProps,
  IPrestamoLibroState
> {
  constructor(props: IPrestamoLibroProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <h1>Préstamo Libro</h1>
      </div>
    );
  }
}

export default PrestamoLibro;
