import React from "react";

import ForecastCard from "./ForecastsCard";
import "./city.css";
import { connect } from "react-redux";
const City = ({
  city,
  searchCity,
  favorite,
  themeMode,
  tempMode,
  toggleFavoritesHandler,
  tempModeChange,
  closeModel,
}) => {
  const forecasts = city?.cityForecasts?.map((forecast) => {
    return (
      <ForecastCard
        themeMode={themeMode}
        key={forecast.date}
        tempMode={tempMode}
        forecast={forecast}
      />
    );
  });
  console.log(forecasts);

  const theme = themeMode === "dark" ? "dark-theme-card" : "light-theme-card";
  const cityComponent = forecasts ? (
    <div className={"forecasts-container " + theme}>
      <div className="forecasts-menu">
        <div onClick={closeModel} className="forecasts-menu-close">
          <i className="fas fa-times"></i>
        </div>

        <div className="forecasts-menu-city">
          <div className="forecasts-menu-city-temp">
            <p
              className={tempMode === "c" ? "active" : ""}
              onClick={() => tempModeChange("c")}
            >
              C°
            </p>
            |
            <p
              className={tempMode === "f" ? "active" : ""}
              onClick={() => tempModeChange("f")}
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
          onClick={() =>
            toggleFavoritesHandler({
              cityName: searchCity.value,
              key: city.key,
            })
          }
        >
          <i className="fas fa-heart"></i>
        </div>
      </div>
      <div className="forecasts-body">
        <p>{searchCity.value}</p>
        <p>
          {tempMode === "c"
            ? `${city.cityCondition[0].cTemperature}`
            : `${city.cityCondition[0].fTemperature}`}
        </p>
      </div>
      <div className="forecasts">{forecasts}</div>
    </div>
  ) : null;
  console.log(cityComponent);
  return cityComponent;
};
const mapStateToProps = ({
  weatherReducer: { city, tempMode },
  ui: { themeMode },
}) => {
  return {
    city,
    tempMode,
    themeMode,
  };
};
export default connect(mapStateToProps, null)(City);
