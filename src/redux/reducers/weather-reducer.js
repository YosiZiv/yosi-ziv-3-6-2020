import {
  FORM_CITY_INPUT_CHANGE,
  SET_SEARCH_CACHE,
  SET_CITY_CONDITION_CACHE,
  SET_CITY_FORECASTS_CACHE,
  SET_SEARCH_RESULT,
  SET_CITY_FORECASTS,
  SET_CITY_CONDITION,
  SET_MODE,
} from "../actions/weather-actions";

const saveSearchCache = (key, data) => {
  const searchCache = JSON.parse(localStorage.getItem("searchCache"));
  searchCache[key] = data;
  localStorage.setItem("searchCache", JSON.stringify(searchCache));
  return searchCache;
};
const saveForecastsCache = (key, data) => {
  const forecastsCache = JSON.parse(localStorage.getItem("forecastsCache"));
  forecastsCache[key] = data;
  localStorage.setItem("forecastsCache", JSON.stringify(forecastsCache));
  return forecastsCache;
};
const saveConditionCache = (key, data) => {
  const conditionCache = JSON.parse(localStorage.getItem("conditionCache"));
  conditionCache[key] = data;
  localStorage.setItem("conditionCache", JSON.stringify(conditionCache));
  return conditionCache;
};
const initState = {
  searchCity: { value: "", error: null },
  searchCache: {},
  forecastsCache: {},
  conditionCache: {},
  searchResult: [],
  city: {
    cityCondition: null,
    cityForecasts: null,
  },
  mode: "c",
};

export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case FORM_CITY_INPUT_CHANGE: {
      return {
        ...state,
        searchCity: {
          value: action.payload.value,
        },
      };
    }
    case SET_SEARCH_RESULT: {
      const { data, cache } = action.payload;
      let searchCache;
      if (cache) {
        searchCache = saveSearchCache(state.searchCity.value, data);
      }
      return {
        ...state,
        searchCache: searchCache || state.searchCache,
        searchResult: data,
      };
    }
    case SET_SEARCH_CACHE: {
      const searchCache = action.payload;
      return { ...state, searchCache };
    }
    case SET_CITY_FORECASTS_CACHE: {
      const forecastsCache = action.payload;
      return { ...state, forecastsCache };
    }
    case SET_CITY_CONDITION_CACHE: {
      const conditionCache = action.payload;
      return { ...state, conditionCache };
    }
    case SET_CITY_FORECASTS: {
      const { data, cache } = action.payload;
      let forecastsCache;
      if (cache) {
        forecastsCache = saveForecastsCache(state.searchCity.value, data);
      }
      return {
        ...state,
        forecastsCache: forecastsCache || state.forecastsCache,
        city: {
          ...state.city,
          cityForecasts: data,
        },
      };
    }
    case SET_CITY_CONDITION: {
      const { data, cache } = action.payload;
      let cityConditionCache;
      if (cache) {
        cityConditionCache = saveConditionCache(state.searchCity.value, data);
      }
      return {
        ...state,
        cityConditionCache: cityConditionCache || state.cityConditionCache,
        city: {
          ...state.city,
          cityCondition: data,
        },
      };
    }
    case SET_MODE: {
      return {
        ...state,
        mode: action.payload,
      };
    }
    default:
      return state;
  }
}
