import React from "react";

import ForecastCard from "./ForecastsCard";
import "./city.css";
const City = ({
  city,
  cityName,
  favorite,
  toggleFavoritesHandler,
  mode,
  modeChange,
}) => {
  const forecasts = city?.cityForecasts?.map((forecast) => {
    return <ForecastCard mode={mode} forecast={forecast} />;
  });
  return (
    <div className="forecasts-container">
      <div className="forecasts-menu">
        <div className="forecasts-menu-close">
          <i className="fas fa-times"></i>
        </div>
        <div className="forecasts-menu-city">
          <div className="forecasts-menu-city-temp">
            <p
              className={mode === "c" ? "active" : ""}
              onClick={() => modeChange("c")}
            >
              C°
            </p>
            |
            <p
              className={mode === "f" ? "active" : ""}
              onClick={() => modeChange("f")}
            >
              F°
            </p>
          </div>
        </div>
        <div
          className={
            favorite
              ? "forecasts-menu-favorite is-favorite"
              : "forecasts-menu-favorite"
          }
          disabled={favorite}
          onClick={() => toggleFavoritesHandler({ cityName, key: city.key })}
        >
          <i className="fas fa-heart"></i>
        </div>
      </div>
      <div className="forecasts-body">
        <p>{cityName}</p>
        <p>
          {mode === "c"
            ? `${city.cityCondition[0].cTemperature}`
            : `${city.cityCondition[0].fTemperature}`}
        </p>
      </div>
      <div className="forecasts">{forecasts}</div>
    </div>
  );
};

export default City;
