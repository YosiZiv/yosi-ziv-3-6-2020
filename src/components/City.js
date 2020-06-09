import React from "react";
import { icons } from "../utils";
import "./city.css";
const City = ({
  city,
  cityName,
  favorite,
  toggleFavoritesHandler,
  mode,
  modeChange,
}) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const forecasts = city?.cityForecasts?.map((forecast) => {
    const date = new Date(forecast.date).getDay();
    return (
      <div className="forecasts-body-card" key={forecast.date}>
        <p>{days[date]}</p>
        <i
          className={
            icons[forecast.day.condition.replace(/\s/g, "")] || icons.default
          }
        ></i>
        <div className="forecasts-body-card-temp">
          <p className="forecasts-body-card-min">
            {mode === "c"
              ? `${Math.round((5 / 9) * (forecast.night.temperature - 32))}C°`
              : `${Math.round(forecast.night.temperature)}F°`}
          </p>
          <p className="forecasts-body-card-max">
            {mode === "c"
              ? `${Math.round((5 / 9) * (forecast.day.temperature - 32))}C°`
              : `${Math.round(forecast.day.temperature)}F°`}
          </p>
        </div>
      </div>
    );
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
