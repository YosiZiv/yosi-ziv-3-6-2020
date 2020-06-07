import React from "react";
import { connect } from "react-redux";
import Input from "../components/Input";
import AutoComplate from "../components/AutoComplate";
import {
  formCityInputChange,
  getCities,
  formSetCities,
  getCityForecasts,
} from "../redux/actions/weather-actions";
const WeatherPage = ({
  searchCache,
  formCityInputChange,
  formSetCities,
  searchResult,
  city,
  getCities,
  getCityForecasts,
}) => {
  console.log(searchCache);
  const validation = {
    city: {
      required: true,
      minLength: 2,
    },
  };
  const onChange = (e) => {
    formCityInputChange({ value: e.target.value, validation: validation.city });
    if (searchCache[e.target.value]) {
      return formSetCities({ data: searchCache[e.target.value], cache: false });
    }
    getCities(e.target.value);
    // searchResult[e.target.value] = e.target.value;
    // localStorage.setItem("searchResult", JSON.stringify(searchResult));
  };
  const onCitySelect = (key) => {
    console.log(key);
    getCityForecasts(key);
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
            error={city.error}
            required
            value={city.value}
            onChange={onChange}
          />
          <AutoComplate searchResult={searchResult} onClick={onCitySelect} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  weatherReducer: { city, searchCache, searchResult },
}) => {
  return { city, searchCache, searchResult };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  formSetCities,
  getCityForecasts,
})(WeatherPage);
