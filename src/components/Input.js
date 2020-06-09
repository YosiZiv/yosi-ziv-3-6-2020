import React from "react";
import "./input.css";
import { connect } from "react-redux";

const Input = ({ id, name, type, error, value, onChange, onBlur, loading }) => {
  const inputClass = error ? "form-control is-invalid" : "form-control";
  console.log(loading);

  return (
    <div className="input-container">
      <label>
        <strong>{name}</strong>
      </label>
      <input
        disabled={loading}
        id={id}
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
const mapStateToProps = ({ ui: { loading } }) => {
  return {
    loading,
  };
};

export default connect(mapStateToProps, null)(Input);
