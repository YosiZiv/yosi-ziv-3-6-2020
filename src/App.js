import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import {
  setFavoritesCache,
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setUserLocationCache,
  setCacheReady,
} from "./redux/actions/cache-actions";
import { getCityByLocation } from "./redux/actions/weather-actions";
import "./App.css";

function App({
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setFavoritesCache,
  getCityByLocation,
  setUserLocationCache,
  setCacheReady,
}) {
  const setLocation = () => {
    const userLocationCache =
      JSON.parse(localStorage.getItem("userLocationCache")) || {};
    if (navigator.geolocation && !Object.keys(userLocationCache).length) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          let: position.coords.latitude,
          log: position.coords.longitude,
        };
        getCityByLocation(data);
      });
    }
    if (Object.keys(userLocationCache).length) {
      setUserLocationCache(userLocationCache);
    }
  };
  const setInitData = () => {
    const searchCache = JSON.parse(localStorage.getItem("searchCache")) || {};
    const forecastsCache =
      JSON.parse(localStorage.getItem("forecastsCache")) || {};
    const conditionCache =
      JSON.parse(localStorage.getItem("conditionCache")) || {};
    const favoritesCache =
      JSON.parse(localStorage.getItem("favoritesCache")) || {};
    if (
      !Object.keys(searchCache).length ||
      !Object.keys(forecastsCache).length ||
      !Object.keys(conditionCache).length ||
      !Object.keys(favoritesCache).length
    ) {
      localStorage.setItem("searchCache", JSON.stringify(searchCache));
      localStorage.setItem("forecastsCache", JSON.stringify(forecastsCache));
      localStorage.setItem("conditionCache", JSON.stringify(conditionCache));
      localStorage.setItem("favoritesCache", JSON.stringify(favoritesCache));
    }
    setSearchCache({ item: searchCache });
    setCityForecastsCache({ item: forecastsCache });
    setCityConditionCache({ item: conditionCache });
    setFavoritesCache({ item: favoritesCache });
    setCacheReady();
  };

  useEffect(() => {
    setInitData();
    setLocation();
  }, []);
  const routes = (
    <Switch>
      <Route exact path="/" component={Weather} />
      <Route path="/favorites" component={Favorites} />
    </Switch>
  );

  return (
    <div className="App">
      <Navigation />
      <header className="App-header">{routes}</header>
    </div>
  );
}
const mapStateToProps = ({ cacheReducer: { userLocationCache, ready } }) => {
  return {
    userLocationCache,
    ready,
  };
};

export default connect(mapStateToProps, {
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setFavoritesCache,
  setUserLocationCache,
  getCityByLocation,
  setCacheReady,
})(App);
