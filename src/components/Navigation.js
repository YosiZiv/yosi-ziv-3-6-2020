import React from "react";
import { NavLink } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
      </div>
    </nav>
  );
}
