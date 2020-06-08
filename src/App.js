import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import {
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
} from "./redux/actions/weather-actions";
import { setFavorites } from "./redux/actions/favorites-actions";
import "./App.css";

function App({
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setFavorites,
}) {
  useEffect(() => {
    const searchCache = JSON.parse(localStorage.getItem("searchCache")) || {};
    const forecastsCache =
      JSON.parse(localStorage.getItem("forecastsCache")) || {};
    const conditionCache =
      JSON.parse(localStorage.getItem("conditionCache")) || {};
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    if (!searchCache.length) {
      localStorage.setItem("searchCache", JSON.stringify(searchCache));
    }
    if (!forecastsCache.length) {
      localStorage.setItem("forecastsCache", JSON.stringify(forecastsCache));
    }
    if (!conditionCache.length) {
      localStorage.setItem("conditionCache", JSON.stringify(conditionCache));
    }
    if (!favorites.length) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    setSearchCache(searchCache);
    setCityForecastsCache(forecastsCache);
    setCityConditionCache(conditionCache);
    setFavorites(favorites);
  }, []);
  const routes = (
    <Switch>
      <Route path="/weather" component={Weather} />
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
export default connect(null, {
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setFavorites,
})(App);
