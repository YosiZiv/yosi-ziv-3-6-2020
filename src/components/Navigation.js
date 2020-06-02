import React from "react";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        WeatherApp
      </Link>
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
          <Link to="/weather">
            <a className="nav-item nav-link">Weather</a>
          </Link>
          <Link to="/favorites" className="nav-item nav-link">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
