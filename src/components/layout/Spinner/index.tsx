import * as React from "react";
import "./index.css";

export interface ISpinnerProps {}

export default function Spinner(props: ISpinnerProps) {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
}
