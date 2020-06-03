import React from "react";
import { connect } from "react-redux";
import Input from "../components/Input";
import {
  formCityInputChange,
  getCities,
  formSetCities,
} from "../redux/actions/weather-actions";
const WeatherPage = ({
  formCityInputChange,
  getCities,
  formSetCities,
  city,
}) => {
  let searchResult = JSON.parse(localStorage.getItem("searchResult"));
  console.log(searchResult);

  const validation = {
    city: {
      required: true,
      minLength: 2,
    },
  };
  const onChange = (e) => {
    formCityInputChange({ value: e.target.value, validation: validation.city });
    if (searchResult[e.target.value]) {
      console.log("i get cached");
      return formSetCities(searchResult[e.target.value]);
    }
    getCities(e.target.value);
    // searchResult[e.target.value] = e.target.value;
    // localStorage.setItem("searchResult", JSON.stringify(searchResult));
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
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = ({ weatherReducer: { city } }) => {
  return { city };
};

export default connect(mapStateToProps, {
  formCityInputChange,
  getCities,
  formSetCities,
})(WeatherPage);
