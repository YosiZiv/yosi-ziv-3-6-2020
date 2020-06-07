import { apiRequest } from "../actions/api";
import { apikey } from "../../apikey";
import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITY_FORECASTS_START,
  GET_CITY_FORECASTS_SUCCESS,
  GET_CITY_FORECASTS_FAIL,
  formSetCities,
  setCityForecasts,
} from "../actions/weather-actions";

const getCitiesStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_START) {
    console.log(action.payload);

    const q = action.payload;
    return dispatch(
      apiRequest(
        "get",
        "/locations/v1/cities/autocomplete",
        null,
        { apikey, q },
        GET_CITIES_SUCCESS,
        GET_CITIES_FAIL
      )
    );
  }
  next(action);
};
const getCitesSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_SUCCESS) {
    const data = action.payload.map((item) => {
      console.log(item);
      return { key: item.Key, city: item.LocalizedName };
    });
    dispatch(formSetCities({ data, cache: true }));
  }
  next(action);
};
const getCitesFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_FAIL) {
    console.log(action.payload);
  }
  next(action);
};

const getCityForecastsStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_START) {
    console.log(action.payload);
    const locationKey = action.payload;
    console.log(locationKey);

    return dispatch(
      apiRequest(
        "get",
        `/forecasts/v1/daily/5day/${locationKey}`,
        null,
        { apikey },
        GET_CITY_FORECASTS_SUCCESS,
        GET_CITY_FORECASTS_FAIL
      )
    );
  }
  next(action);
};
const getCityForecastsSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_SUCCESS) {
    console.log(action.payload);
    return dispatch(setCityForecasts(action.payload));
  }
  next(action);
};
const getCityForecastsFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_FAIL) {
  }
  next(action);
};
export const weatherMdl = [
  getCitiesStart,
  getCitesSuccess,
  getCitesFail,
  getCityForecastsStart,
  getCityForecastsSuccess,
  getCityForecastsFail,
];
