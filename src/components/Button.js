import React from "react";
import "./button.css";

const Button = ({ text, onClick, themeMode }) => {
  const theme =
    themeMode === "dark"
      ? "btn-light dark-mode-button"
      : "btn-dark light-mode-button";
  return (
    <button onClick={onClick} className={"btn " + theme}>
      {text}
    </button>
  );
};
export default Button;
