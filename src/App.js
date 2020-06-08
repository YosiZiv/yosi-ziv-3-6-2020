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
} from "./redux/actions/cache-actions";
import "./App.css";

function App({
  setSearchCache,
  setCityForecastsCache,
  setCityConditionCache,
  setFavoritesCache,
}) {
  useEffect(() => {
    const setInitData = () => {
      const searchCache = JSON.parse(localStorage.getItem("searchCache")) || {};
      const forecastsCache =
        JSON.parse(localStorage.getItem("forecastsCache")) || {};
      const conditionCache =
        JSON.parse(localStorage.getItem("conditionCache")) || {};
      const favoritesCache =
        JSON.parse(localStorage.getItem("favoritesCache")) || {};
      if (!searchCache.length) {
        localStorage.setItem("searchCache", JSON.stringify(searchCache));
      }
      if (!forecastsCache.length) {
        localStorage.setItem("forecastsCache", JSON.stringify(forecastsCache));
      }
      if (!conditionCache.length) {
        localStorage.setItem("conditionCache", JSON.stringify(conditionCache));
      }
      if (!favoritesCache.length) {
        localStorage.setItem("favoritesCache", JSON.stringify(favoritesCache));
      }
      setSearchCache({ item: searchCache });
      setCityForecastsCache({ item: forecastsCache });
      setCityConditionCache({ item: conditionCache });
      setFavoritesCache({ item: favoritesCache });
    };
    setInitData();
  }, [
    setSearchCache,
    setCityForecastsCache,
    setCityConditionCache,
    setFavoritesCache,
  ]);
  const routes = (
    <Switch>
      <Route path="/" component={Weather} />
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
  setFavoritesCache,
})(App);
