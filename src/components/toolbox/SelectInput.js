import React from "react";

export default function SelectInput({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
}) {
  return (
    <div className="form-group">
      <lable htmlFor={name}>{label}</lable>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        style={{ marginBottom: "4px" }}
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger"> {error} </div>}
    </div>
  );
}
