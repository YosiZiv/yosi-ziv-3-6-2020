import {
  FORM_CITY_INPUT_CHANGE,
  SET_SEARCH_RESULT,
  SET_CITY_FORECASTS,
  SET_CITY_CONDITION,
  SET_TEMP_MODE,
} from "../actions/weather-actions";
const initState = {
  searchCity: { value: "", error: null },
  searchResult: [],
  city: {
    key: null,
    cityCondition: null,
    cityForecasts: null,
  },
  tempMode: "c",
};

export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case FORM_CITY_INPUT_CHANGE: {
      const { key, value, error } = action.payload;
      return {
        ...state,
        searchCity: {
          value,
          error,
        },
        city: {
          ...state.city,
          key: key ? key : null,
        },
      };
    }
    case SET_SEARCH_RESULT: {
      const { data } = action.payload;
      return {
        ...state,
        searchResult: data,
      };
    }
    case SET_CITY_FORECASTS: {
      const { data } = action.payload;
      return {
        ...state,
        city: {
          ...state.city,
          cityForecasts: data,
        },
      };
    }
    case SET_CITY_CONDITION: {
      const { data } = action.payload;
      return {
        ...state,
        city: {
          ...state.city,
          cityCondition: data,
        },
      };
    }
    case SET_TEMP_MODE: {
      return {
        ...state,
        tempMode: action.payload,
      };
    }
    default:
      return state;
  }
}
