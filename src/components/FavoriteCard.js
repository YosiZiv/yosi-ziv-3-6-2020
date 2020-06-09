import React from "react";
import { icons } from "../utils";
import "./favorite-card.css";
const FavoriteCard = ({ data, cityName, mode }) => {
  console.log(mode);

  return (
    <div className="favorite-card">
      <div className="favorite-card-cityname">
        <p>{cityName}</p>
      </div>
      <div className="favorite-card-condition">
        <i
          className={
            icons[data[0].condition.replace(/\s/g, "")] || icons.default
          }
        ></i>
      </div>
      <div className="favorite-card-temp">
        <p>
          {mode === "c"
            ? `${Math.round(data[0].cTemperature)}C°`
            : `${Math.round(data[0].fTemperature)}F°`}
        </p>
      </div>
    </div>
  );
};
export default FavoriteCard;
