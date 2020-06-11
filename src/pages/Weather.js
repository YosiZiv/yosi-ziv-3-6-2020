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
  setTempMode,
} from "../redux/actions/weather-actions";
import { toggleFavorites } from "../redux/actions/cache-actions";
import { setMessage } from "../redux/actions/ui";
const WeatherPage = ({
  searchCache,
  conditionCache,
  forecastsCache,
  favoritesCache,
  userLocationCache,
  searchCity,
  setSearchResult,
  ready,
  message,
  themeMode,
  getCities,
  formCityInputChange,
  getCityForecasts,
  setCityForecasts,
  getCityCondition,
  setCityCondition,
  toggleFavorites,
  setTempMode,
  setMessage,
}) => {
  const validation = {
    isRequired: true,
    english: true,
  };
  const setLocation = () => {
    if (Object.keys(userLocationCache).length) {
      const key = Object.keys(userLocationCache);

      formCityInputChange({
        key: key[0],
        value: userLocationCache[key],
        validation,
      });
      if (conditionCache[key[0]] && forecastsCache[key[0]]) {
        setCityCondition({ data: conditionCache[key[0]] });
        return setCityForecasts({
          data: forecastsCache[key[0]],
        });
      }
      getCityCondition(key[0]);
      return getCityForecasts(key[0]);
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
  };
  useEffect(() => {
    setLocation();
    // eslint-disable-next-line
  }, [userLocationCache, ready]);
  const onChange = (e) => {
    if (message) {
      setMessage(null);
    }
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
    if (conditionCache[locationKey] && forecastsCache[locationKey]) {
      setCityCondition({ data: conditionCache[locationKey] });
      return setCityForecasts({
        data: forecastsCache[locationKey],
      });
    }
    getCityCondition(locationKey);
    return getCityForecasts(locationKey);
  };
  const toggleFavoritesHandler = ({ cityName, key }) => {
    toggleFavorites({ cityName, key });
  };
  const tempModeChange = (tempMode) => {
    setTempMode(tempMode);
  };
  const closeModel = () => {
    setCityCondition({ data: null });
    setCityForecasts({ data: null });
    formCityInputChange({ key: null, value: "" });
  };
  const theme = themeMode === "dark" ? "dark-theme" : "light-theme";
  return (
    <div className={"weather-page " + theme}>
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
          <AutoComplete onClick={onCitySelect} />
        </form>
      </div>
      <Spinner />

      <City
        searchCity={searchCity}
        closeModel={closeModel}
        tempModeChange={tempModeChange}
        toggleFavoritesHandler={toggleFavoritesHandler}
        favorite={favoritesCache[searchCity.value]}
      />
      {message && (
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>{message}</h1>
      )}
    </div>
  );
};

const mapStateToProps = ({
  weatherReducer: { searchCity },
  cacheReducer: {
    searchCache,
    forecastsCache,
    conditionCache,
    favoritesCache,
    userLocationCache,
    ready,
  },
  ui: { message, themeMode },
}) => {
  return {
    themeMode,
    searchCity,
    searchCache,
    conditionCache,
    forecastsCache,
    favoritesCache,
    userLocationCache,
    ready,
    message,
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
  setTempMode,
  setMessage,
})(WeatherPage);
