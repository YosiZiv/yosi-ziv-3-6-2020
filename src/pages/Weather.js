import React from "react";
import { connect } from "react-redux";
import "./weather.css";
import Input from "../components/Input";
import AutoComplete from "../components/AutoComplete";
import City from "../components/City";
import { checkValidation } from "../utils";
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
import { toggleFavorites } from "../redux/actions/cache-actions";
const WeatherPage = ({
  searchCache,
  conditionCache,
  forecastsCache,
  favoritesCache,
  searchResult,
  searchCity,
  setSearchResult,
  city,
  mode,
  getCities,
  formCityInputChange,
  getCityForecasts,
  setCityForecasts,
  getCityCondition,
  setCityCondition,
  toggleFavorites,
  setMode,
}) => {
  const validation = {
    isRequired: true,
    english: true,
  };
  const onChange = (e) => {
    console.log(e.target);
    const error = checkValidation(e.target.id, e.target.value, validation);
    console.log(error);
    if (error) {
      return formCityInputChange({
        value: e.target.value.toLowerCase(),
        error,
      });
    }
    formCityInputChange({
      value: e.target.value.toLowerCase(),
      error: null,
    });
    if (searchCache[e.target.value]) {
      return setSearchResult({
        data: searchCache[e.target.value],
      });
    }
    return getCities(e.target.value);
    // searchResult[e.target.value] = e.target.value;
    // localStorage.setItem("searchResult", JSON.stringify(searchResult));
  };
  const onCitySelect = (locationKey, city) => {
    formCityInputChange({
      key: locationKey,
      value: city,
      validation: validation.city,
    });
    setSearchResult({ data: [] });
    if (conditionCache[city] && forecastsCache[city]) {
      setCityCondition({ data: conditionCache[city] });
      return setCityForecasts({
        city,
        data: forecastsCache[city],
      });
    }
    getCityCondition(locationKey);
    return getCityForecasts({ locationKey, city });
  };
  const toggleFavoritesHandler = ({ cityName, key }) => {
    console.log(cityName, key);

    toggleFavorites({ cityName, key });
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
            favorite={favoritesCache[searchCity.value]}
            cityName={searchCity.value}
            city={city}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  weatherReducer: { searchCity, searchResult, city, mode },
  cacheReducer: { searchCache, forecastsCache, conditionCache, favoritesCache },
}) => {
  return {
    searchCity,
    searchCache,
    conditionCache,
    forecastsCache,
    searchResult,
    city,
    mode,
    favoritesCache,
  };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  setSearchResult,
  getCityForecasts,
  getCityCondition,
  setCityForecasts,
  setCityCondition,
  toggleFavorites,
  setMode,
})(WeatherPage);
