import React from "react";
import { connect } from "react-redux";
import "./weather.css";
import Input from "../components/Input";
import AutoComplete from "../components/AutoComplete";
import City from "../components/City";
import {
  formCityInputChange,
  getCities,
  getCityForecasts,
  setCityForecasts,
  setSearchResult,
  getCityCondition,
  setCityCondition,
  setMode,
} from "../redux/actions/weather-actions";
import { toggleFavorites } from "../redux/actions/favorites-actions";
const WeatherPage = ({
  searchCache,
  conditionCache,
  forecastsCache,
  searchResult,
  searchCity,
  setSearchResult,
  city,
  mode,
  favorites,
  getCities,
  formCityInputChange,
  getCityForecasts,
  setCityForecasts,
  getCityCondition,
  setCityCondition,
  toggleFavorites,
  setMode,
}) => {
  console.log("123", favorites);

  const validation = {
    city: {
      required: true,
      minLength: 2,
    },
  };
  const onChange = (e) => {
    formCityInputChange({ value: e.target.value, validation: validation.city });
    if (searchCache[e.target.value]) {
      return setSearchResult({
        data: searchCache[e.target.value],
        cache: false,
      });
    }
    return getCities(e.target.value);
    // searchResult[e.target.value] = e.target.value;
    // localStorage.setItem("searchResult", JSON.stringify(searchResult));
  };
  const onCitySelect = (key, city) => {
    console.log(key, city);
    formCityInputChange({ value: city, validation: validation.city });
    setSearchResult({ data: [], cache: false });
    if (conditionCache[city] && forecastsCache[city]) {
      setCityCondition({ data: conditionCache[city], cache: false });
      return setCityForecasts({
        city,
        data: forecastsCache[city],
        cache: false,
      });
    }
    getCityCondition(key);
    return getCityForecasts({ key, city });
  };
  const toggleFavoritesHandler = (cityName) => {
    console.log("toggle work", cityName);

    toggleFavorites(cityName);
  };
  const modeChange = (mode) => {
    setMode(mode);
  };
  return (
    <div className="weather-page">
      <div className="weather-page-title">
        <h1>Search city</h1>
      </div>
      <div className="weather-page-container">
        <form>
          <Input
            id="city"
            name="City"
            type="text"
            error={searchCity.error}
            required
            value={searchCity.value}
            onChange={onChange}
          />
          <AutoComplete searchResult={searchResult} onClick={onCitySelect} />
        </form>
      </div>
      {city.cityForecasts && (
        <div>
          <City
            mode={mode}
            modeChange={modeChange}
            toggleFavoritesHandler={toggleFavoritesHandler}
            favorite={favorites[searchCity.value]}
            cityName={searchCity.value}
            cityForecasts={city.cityForecasts}
            cityCondition={city.cityCondition}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  weatherReducer: {
    searchCity,
    searchCache,
    forecastsCache,
    conditionCache,
    searchResult,
    city,
    mode,
  },
  favoritesReducer: { favorites },
}) => {
  return {
    searchCity,
    searchCache,
    conditionCache,
    forecastsCache,
    searchResult,
    city,
    mode,
    favorites,
  };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  setSearchResult,
  getCityForecasts,
  getCityCondition,
  setCityForecasts,
  setSearchResult,
  setCityCondition,
  toggleFavorites,
  setMode,
})(WeatherPage);
