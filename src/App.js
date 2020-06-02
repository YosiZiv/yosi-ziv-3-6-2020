import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { getCity } from "./redux/actions/weather-actions";
import Navigation from "./components/Navigation";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import "./App.css";

function App({ getCity }) {
  useEffect(() => {
    getCity();
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

export default connect(null, { getCity })(App);
