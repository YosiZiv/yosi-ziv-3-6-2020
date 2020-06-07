import React from "react";
import "./city-forecasts.css";
const CityForecasts = ({ cityForecasts, cityName }) => {
  console.log(cityName);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const icons = {
    Hot: "fas fa-sun",
    Sunny: "fas fa-sun",
    Mostlysunny: "fas fa-sun",
    Partlysunny: "fas fa-sun",
    Partlycloudy: "fas fa-cloud",
    Mostlycloudy: "fas fa-cloud",
    Thunderstorms: "fas fa-cloud-showers-heavy",
    default: "fas fa-cloud",
  };
  const forecasts = cityForecasts.map((forecast) => {
    console.log(forecast);
    const date = new Date(forecast.date).getDay();
    return (
      <div className="forecasts-body-card">
        <p>{days[date]}</p>
        <i className={icons[forecast.day.condition.replace(/\s/g, "")]}></i>
        <div className="forecasts-body-card-temp">
          <p className="forecasts-body-card-min">
            {Math.round((5 / 9) * (forecast.night.temperature - 32))}c
          </p>
          <p className="forecasts-body-card-max">
            {Math.round((5 / 9) * (forecast.day.temperature - 32))}c
          </p>
        </div>
      </div>
    );
  });
  return (
    <div className="forecasts-container">
      <div className="forecasts-menu">
        <i className="fas fa-times"></i>
        <p>{cityName}</p>
        <i className="fas fa-heart"></i>
      </div>
      <div className="forecasts-body"></div>
      <div className="forecasts">{forecasts}</div>
    </div>
  );
};
export default CityForecasts;
