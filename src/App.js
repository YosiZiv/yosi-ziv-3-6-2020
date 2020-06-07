import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import {
  setSearchCache,
  setCityForecastsCache,
} from ".//redux/actions/weather-actions";
import "./App.css";

function App({ setSearchCache, setCityForecastsCache }) {
  useEffect(() => {
    let searchCache = JSON.parse(localStorage.getItem("searchCache")) || {};
    let forecastsCache =
      JSON.parse(localStorage.getItem("forecastsCache")) || {};
    if (!searchCache.length) {
      localStorage.setItem("searchCache", JSON.stringify(searchCache));
    }
    if (!forecastsCache.length) {
      localStorage.setItem("forecastsCache", JSON.stringify(forecastsCache));
    }
    setSearchCache(searchCache);
    setCityForecastsCache(forecastsCache);
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
export default connect(null, { setSearchCache, setCityForecastsCache })(App);
