import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeThemeMode } from "../redux/actions/ui";
import Button from "./Button";
const Navigation = ({ themeMode, changeThemeMode }) => {
  console.log(themeMode === "dark");
  const navClass =
    themeMode === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";
  return (
    <nav className={"navbar navbar-expand-lg " + navClass}>
      <NavLink className="nav-item nav-link" to="/">
        WeatherApp
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink
            exact
            className="nav-item nav-link"
            to="/"
            activeStyle={{ color: "blue" }}
          >
            Weather
          </NavLink>
          <NavLink
            to="/favorites"
            className="nav-item nav-link"
            activeStyle={{ color: "blue" }}
          >
            Favorites
          </NavLink>
        </div>
        <div style={{ marginTop: "6px", marginLeft: "65%" }}>
          <Button
            themeMode={themeMode}
            onClick={changeThemeMode}
            text={themeMode === "dark" ? "Light Mode" : "Dark Mode"}
          />
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = ({ ui: { themeMode } }) => {
  return {
    themeMode,
  };
};

export default connect(mapStateToProps, { changeThemeMode })(Navigation);
