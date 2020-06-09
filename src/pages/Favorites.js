import React, { useEffect } from "react";
import "./favorites.css";
import { connect } from "react-redux";
import FavoriteCard from "../components/FavoriteCard";
import { getCityCondition } from "../redux/actions/weather-actions";
const Favorites = ({ favoritesCache, conditionCache, mode }) => {
  const getFavoritesState = (favorites) => {
    const data = Object.entries(favorites).map((item) => {
      if (conditionCache[item[1]]) {
        return (
          <FavoriteCard
            mode={mode}
            key={item[1]}
            cityName={item[0]}
            data={conditionCache[item[1]]}
          />
        );
      } else {
        getCityCondition(item[1]);
      }
    });
    return data;
  };
  const favorites = getFavoritesState(favoritesCache);
  return <div className="favorites-container">{favorites}</div>;
};

const mapStateToProps = ({
  weatherReducer: { mode },
  cacheReducer: { favoritesCache, conditionCache, ready },
}) => {
  return {
    mode,
    favoritesCache,
    conditionCache,
    ready,
  };
};

export default connect(mapStateToProps, null)(Favorites);
