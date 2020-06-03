import React from "react";
import "./input.css";

const Input = ({ name, type, error, value, onChange, onBlur }) => {
  const inputClass = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="input-container">
      <label>
        <strong>{name}</strong>
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={`Enter ${name}`}
        autoComplete="off"
        className={inputClass}
      />
      {error && (
        <div className="invalid-feedback">
          <small className="text-danger">{error}</small>
        </div>
      )}
    </div>
  );
};

export default Input;
