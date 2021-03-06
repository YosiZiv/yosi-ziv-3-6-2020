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
  GET_CITY_BY_LOCATION_START,
  GET_CITY_BY_LOCATION_SUCCESS,
  GET_CITY_BY_LOCATION_FAIL,
  setSearchResult,
  setCityCondition,
  setCityForecasts,
} from "../actions/weather-actions";
import { setCache } from "../actions/cache-actions";
import { setMessage } from "../actions/ui";
import { saveCache } from "../../utils";
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
    const {
      payload,
      data: { q },
    } = action;
    const filteredData = payload.map((item) => {
      return { key: item.Key, city: item.LocalizedName };
    });
    dispatch(
      setCache({
        item: "searchCache",
        key: q.toLowerCase(),
        data: filteredData,
      })
    );
    return dispatch(setSearchResult({ data: filteredData }));
  }
  next(action);
};
const getCitesFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_FAIL) {
    return dispatch(setMessage("someting went strong :/"));
  }
  next(action);
};

const getCityForecastsStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_START) {
    const locationKey = action.payload;
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
    dispatch(
      setCache({
        item: "forecastsCache",
        key: locationKey,
        data: filterForecast,
      })
    );
    return dispatch(setCityForecasts({ data: filterForecast }));
  }
  next(action);
};
const getCityForecastsFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_FAIL) {
    return dispatch(setMessage("someting went strong :/"));
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
    const { locationKey } = action.data;
    const cityCondition = action.payload?.map((condition) => {
      return {
        condition: condition.WeatherText,
        cTemperature: condition.Temperature?.Metric?.Value,
        fTemperature: condition.Temperature?.Imperial?.Value,
      };
    });
    dispatch(
      setCache({
        item: "conditionCache",
        key: locationKey,
        data: cityCondition,
      })
    );
    return dispatch(setCityCondition({ data: cityCondition }));
  }
  next(action);
};

const getCityConditionFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_FORECASTS_FAIL) {
    // TODO handle api bad request

    return dispatch(setMessage("someting went strong :/"));
  }
  next(action);
};
const getCityByLocationStart = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_BY_LOCATION_START) {
    const userLocation = action.payload;
    const q = `${userLocation.let},${userLocation.log}`;
    return dispatch(
      apiRequest(
        "get",
        `/locations/v1/cities/geoposition/search`,
        null,
        { apikey, q },
        GET_CITY_BY_LOCATION_SUCCESS,
        GET_CITY_BY_LOCATION_FAIL
      )
    );
  }
  next(action);
};
const getCityByLocationSuccess = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_BY_LOCATION_SUCCESS) {
    const key = action.payload.Key;
    const cityName = action.payload.LocalizedName;
    saveCache("userLocationCache", { [key]: cityName });
    return dispatch(
      setCache([
        null,
        null,
        null,
        null,
        { userLocationCache: { [key]: cityName } },
      ])
    ); // only update location
  }
  next(action);
};
const getCityByLocationFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY_BY_LOCATION_FAIL) {
    return dispatch(setMessage("someting went strong :/"));
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
  getCityConditionFail,
  getCityByLocationStart,
  getCityByLocationSuccess,
  getCityByLocationFail,
];
