import React from "react";
import { connect } from "react-redux";
import Input from "../components/Input";
import AutoComplete from "../components/AutoComplete";
import CityForecasts from "../components/CityForecasts";
import {
  formCityInputChange,
  getCities,
  getCityForecasts,
  setCityForecasts,
  setSearchResult,
} from "../redux/actions/weather-actions";
const WeatherPage = ({
  searchCache,
  forecastsCache,
  searchResult,
  searchCity,
  setSearchResult,
  city,
  getCities,
  formCityInputChange,
  getCityForecasts,
  setCityForecasts,
}) => {
  console.log("123", searchCity);

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
    if (forecastsCache[city]) {
      return setCityForecasts({
        city,
        data: forecastsCache[city],
        cache: false,
      });
    }
    return getCityForecasts({ key, city });
  };
  return (
    <div>
      <h1>weather page</h1>
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
          <CityForecasts
            cityName={searchCity.value}
            cityForecasts={city.cityForecasts}
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
    searchResult,
    city,
  },
}) => {
  return { searchCity, searchCache, forecastsCache, searchResult, city };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  setSearchResult,
  getCityForecasts,
  setCityForecasts,
  setSearchResult,
})(WeatherPage);
