import * as React from "react";

export interface IFormGroupProps {
  label: string;
  name: string;
  placeholder: string;
  value: number | string | undefined;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormGroup(props: IFormGroupProps) {
  const { label, name, handleOnChange, placeholder, value } = props;
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}
