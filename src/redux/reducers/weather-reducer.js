import {
  FORM_CITY_INPUT_CHANGE,
  FORM_SET_CITIES,
  SET_SEARCH_CACHE,
  SET_SEARCH_RESULT,
  SET_CITY_FORECASTS,
} from "../actions/weather-actions";

const saveResultToLocalStorage = (key, data) => {
  const searchCache = JSON.parse(localStorage.getItem("searchCache"));
  searchCache[key] = data;
  localStorage.setItem("searchCache", JSON.stringify(searchCache));
  return searchCache;
};
const initState = {
  city: { value: "", error: null },
  searchCache: {},
  searchResult: [],
  cityForecasts: null,
};

export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case FORM_CITY_INPUT_CHANGE: {
      return {
        ...state,
        city: {
          value: action.payload.value,
        },
      };
    }
    case FORM_SET_CITIES: {
      const { data, cache } = action.payload;
      let searchCache;
      if (cache) {
        searchCache = saveResultToLocalStorage(state.city.value, data);
        console.log(searchCache);
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
    case SET_CITY_FORECASTS: {
      const cityForecasts = action.payload;
      return { ...state, cityForecasts };
    }
    default:
      return state;
  }
}
// case SET_CURRENT_CITY: {
//   console.log("got in the reducer", action.payload);

//   return {
//     ...state,
//     currentCity: action.payload,
//   };
// }
// case SET_SEARCH_RESULT: {
//   console.log(action.payload);

//   return {
//     ...state,
//     searchResult: action.payload,
//   };
// }
