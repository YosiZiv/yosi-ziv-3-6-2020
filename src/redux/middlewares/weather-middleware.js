import { apiRequest } from "../actions/api";
import { apikey } from "../../apikey";
import {
  GET_CITIES_START,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
  GET_CITY_FORECASTS_START,
  GET_CITY_FORECASTS_SUCCESS,
  GET_CITY_FORECASTS_FAIL,
  GET_CITY_CONDITION_START,
  GET_CITY_CONDITION_SUCCESS,
  GET_CITY_CONDITION_FAIL,
  setSearchResult,
  formCityInputChange,
  setCityForecasts,
} from "../actions/weather-actions";

const getCitiesStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_START) {
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
      return { key: item.Key, city: item.LocalizedName };
    });
    return dispatch(setSearchResult({ data, cache: true }));
  }
  next(action);
};
const getCitesFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_FAIL) {
  }
  next(action);
};

const getCityForecastsStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_START) {
    console.log(action.payload);
    const { key, city } = action.payload;
    return dispatch(
      apiRequest(
        "get",
        `/forecasts/v1/daily/5day/${key}`,
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
    const forecasts = action.payload.DailyForecasts?.map((foreCast) => {
      console.log(foreCast);
      return {
        date: foreCast.Date,
        day: {
          temperature: foreCast.Temperature?.Maximum?.Value,
          condition: foreCast.Day?.IconPhrase,
        },
        night: {
          temperature: foreCast.Temperature?.Minimum?.Value,
          condition: foreCast.Night?.IconPhrase,
        },
      };
    });
    console.log(forecasts);

    return dispatch(setCityForecasts({ data: forecasts, cache: true }));
  }
  next(action);
};
const getCityForecastsFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_FAIL) {
  }
  next(action);
};

const getCityConditionStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_CONDITION_START) {
    const locationKey = action.payload;
    return dispatch(
      apiRequest(
        "get",
        `currentconditions/v1/${locationKey}`,
        null,
        { apikey },
        GET_CITY_CONDITION_SUCCESS,
        GET_CITY_CONDITION_FAIL
      )
    );
  }
  next(action);
};

const getCityConditionSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_CONDITION_SUCCESS) {
  }
  next(action);
};

const getCityConditionFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_FAIL) {
    const locationKey = action.payload;

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

export const weatherMdl = [
  getCitiesStart,
  getCitesSuccess,
  getCitesFail,
  getCityForecastsStart,
  getCityForecastsSuccess,
  getCityForecastsFail,
  getCityConditionStart,
  getCityConditionSuccess,
  getCityForecastsFail,
];
