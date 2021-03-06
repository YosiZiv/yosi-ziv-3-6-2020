import React from "react";
import "./favorites.css";
import { connect } from "react-redux";
import FavoriteCard from "../components/FavoriteCard";
import { getCityCondition } from "../redux/actions/weather-actions";
const Favorites = ({ favoritesCache, conditionCache, tempMode }) => {
  const getFavoritesState = (favorites) => {
    const data = Object.entries(favorites).map((item) => {
      if (conditionCache[item[1]]) {
        return (
          <FavoriteCard
            tempMode={tempMode}
            key={item[1]}
            cityName={item[0]}
            data={conditionCache[item[1]]}
          />
        );
      } else {
        return getCityCondition(item[1]);
      }
    });
    return data;
  };
  const favorites = getFavoritesState(favoritesCache);
  return (
    <div className="favorites-container">
      <div className="favorites-title">
        <h1>Favorites Cities</h1>
      </div>
      <div className="favorites-cards">{favorites}</div>
    </div>
  );
};

const mapStateToProps = ({
  weatherReducer: { tempMode },
  cacheReducer: { favoritesCache, conditionCache, ready },
}) => {
  return {
    tempMode,
    favoritesCache,
    conditionCache,
    ready,
  };
};

export default connect(mapStateToProps, null)(Favorites);
