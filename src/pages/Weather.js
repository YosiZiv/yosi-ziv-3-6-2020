import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./weather.css";
import Input from "../components/Input";
import AutoComplete from "../components/AutoComplete";
import City from "../components/City";
import Spinner from "../components/Spinner";
import { checkValidation } from "../utils";
import {
  formCityInputChange,
  getCities,
  getCityByLocation,
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
  userLocationCache,
  searchResult,
  searchCity,
  setSearchResult,
  city,
  mode,
  ready,
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
  useEffect(() => {
    if (Object.keys(userLocationCache).length) {
      const { key, cityName } = userLocationCache;
      formCityInputChange({
        key,
        value: cityName,
        validation,
      });
      if (conditionCache[key] && forecastsCache[key]) {
        setCityCondition({ data: conditionCache[key] });
        return setCityForecasts({
          data: forecastsCache[key],
        });
      }
      getCityCondition(key);
      return getCityForecasts(key);
    }
    if (!Object.keys(userLocationCache).length && ready) {
      const telAvivKey = "215805";
      formCityInputChange({
        key: telAvivKey,
        value: "Tel Aviv",
        validation,
      });
      if (conditionCache[telAvivKey] && forecastsCache[telAvivKey]) {
        setCityCondition({ data: conditionCache[telAvivKey] });
        return setCityForecasts({
          data: forecastsCache[telAvivKey],
        });
      }
      getCityCondition(telAvivKey);
      return getCityForecasts(telAvivKey);
    }
  }, [userLocationCache, ready]);
  const onChange = (e) => {
    setSearchResult({ data: [] });
    setCityCondition({ data: null });
    setCityForecasts({ data: null });
    const error = checkValidation(e.target.id, e.target.value, validation);
    if (error) {
      // if input error return only InputChange action
      return formCityInputChange({
        value: e.target.value,
        error,
      });
    }
    formCityInputChange({
      value: e.target.value,
      error: null,
    });
    if (searchCache[e.target.value]) {
      return setSearchResult({
        data: searchCache[e.target.value],
      });
    }
    return getCities(e.target.value);
  };
  const onCitySelect = (locationKey, city) => {
    formCityInputChange({
      key: locationKey,
      value: city,
      validation,
    });
    setSearchResult({ data: [] });
    if (conditionCache[city] && forecastsCache[city]) {
      setCityCondition({ data: conditionCache[city] });
      return setCityForecasts({
        data: forecastsCache[city],
      });
    }
    getCityCondition(locationKey);
    return getCityForecasts(locationKey);
  };
  const toggleFavoritesHandler = ({ cityName, key }) => {
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
      <Spinner />
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
  cacheReducer: {
    searchCache,
    forecastsCache,
    conditionCache,
    favoritesCache,
    userLocationCache,
    ready,
  },
}) => {
  return {
    searchCity,
    searchResult,
    city,
    mode,
    searchCache,
    conditionCache,
    forecastsCache,
    favoritesCache,
    userLocationCache,
    ready,
  };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  getCityByLocation,
  setSearchResult,
  getCityForecasts,
  getCityCondition,
  setCityForecasts,
  setCityCondition,
  toggleFavorites,
  setMode,
})(WeatherPage);
