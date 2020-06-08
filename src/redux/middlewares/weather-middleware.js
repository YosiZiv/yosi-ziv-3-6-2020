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
  setCityCondition,
  setCityForecasts,
} from "../actions/weather-actions";
import {
  setSearchCache,
  setCityConditionCache,
  setCityForecastsCache,
} from "../actions/cache-actions";

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
        GET_CITIES_FAIL,
        { q }
      )
    );
  }
  next(action);
};
const getCitesSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_SUCCESS) {
    console.log(action);
    const {
      payload,
      data: { q },
    } = action;
    const filteredData = payload.map((item) => {
      console.log(item);

      return { key: item.Key, city: item.LocalizedName };
    });
    dispatch(setSearchCache({ key: q, data: filteredData }));
    return dispatch(setSearchResult({ data: filteredData }));
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
    const { locationKey } = action.payload;
    return dispatch(
      apiRequest(
        "get",
        `/forecasts/v1/daily/5day/${locationKey}`,
        null,
        { apikey },
        GET_CITY_FORECASTS_SUCCESS,
        GET_CITY_FORECASTS_FAIL,
        { locationKey }
      )
    );
  }
  next(action);
};
const getCityForecastsSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_SUCCESS) {
    const {
      payload,
      data: { locationKey },
    } = action;
    const filterForecast = payload.DailyForecasts?.map((foreCast) => {
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
    dispatch(setCityForecastsCache({ key: locationKey, data: filterForecast }));
    return dispatch(setCityForecasts({ data: filterForecast }));
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
        GET_CITY_CONDITION_FAIL,
        { locationKey }
      )
    );
  }
  next(action);
};

const getCityConditionSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_CONDITION_SUCCESS) {
    console.log(action);
    const { locationKey } = action.data;
    const cityCondition = action.payload?.map((condition) => {
      return {
        cTemperature: condition.Temperature?.Metric?.Value,
        fTemperature: condition.Temperature?.Imperial?.Value,
      };
    });
    console.log(cityCondition, locationKey);

    dispatch(setCityConditionCache({ key: locationKey, data: cityCondition }));
    return dispatch(setCityCondition({ data: cityCondition }));
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
