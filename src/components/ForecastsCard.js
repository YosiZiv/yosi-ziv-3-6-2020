import React from "react";
import "./forecasts-card.css";
import { icons } from "../utils";
const ForecastsCard = ({ forecast, tempMode, themeMode }) => {
  const theme = themeMode === "dark" ? "dark-mode" : "light-mode";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(forecast.date).getDay();
  return (
    <div className={"forecasts-body-card " + theme}>
      <p>{days[date]}</p>
      <i
        className={
          icons[forecast.day.condition.replace(/\s/g, "")] || icons.default
        }
      ></i>
      <div className="forecasts-body-card-temp">
        <p className="forecasts-body-card-min">
          {tempMode === "c"
            ? `${Math.round((5 / 9) * (forecast.night.temperature - 32))}C°`
            : `${Math.round(forecast.night.temperature)}F°`}
        </p>
        <p className="forecasts-body-card-max">
          {tempMode === "c"
            ? `${Math.round((5 / 9) * (forecast.day.temperature - 32))}C°`
            : `${Math.round(forecast.day.temperature)}F°`}
        </p>
      </div>
    </div>
  );
};
export default ForecastsCard;
