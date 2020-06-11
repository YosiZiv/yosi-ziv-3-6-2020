import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import { setCache, setCacheReady } from "./redux/actions/cache-actions";
import { getCityByLocation } from "./redux/actions/weather-actions";
import "./App.css";

function App({ setCache, getCityByLocation, setCacheReady }) {
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
        return null;
      });
    }
    if (Object.keys(userLocationCache).length) {
      return userLocationCache;
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
    const userLocationCache = setLocation();
    console.log(userLocationCache);

    userLocationCache
      ? setCache([
          { searchCache },
          { forecastsCache },
          { conditionCache },
          { favoritesCache },
          { userLocationCache },
        ])
      : setCache([
          { searchCache },
          { forecastsCache },
          { conditionCache },
          { favoritesCache },
        ]);

    setCacheReady();
  };

  useEffect(() => {
    setInitData();
    // eslint-disable-next-line
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
  setCache,
  getCityByLocation,
  setCacheReady,
})(App);
