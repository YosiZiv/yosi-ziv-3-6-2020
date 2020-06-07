import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import { setSearchCache } from ".//redux/actions/weather-actions";
import "./App.css";

function App({ setSearchCache }) {
  useEffect(() => {
    let searchCache = JSON.parse(localStorage.getItem("searchCache")) || {};
    console.log(searchCache);
    if (!searchCache.length) {
      localStorage.setItem("searchCache", JSON.stringify(searchCache));
    }
    setSearchCache(searchCache);
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
export default connect(null, { setSearchCache })(App);
