import {
  FORM_CITY_INPUT_CHANGE,
  FORM_SET_CITIES,
  SET_SEARCH_RESULT,
} from "../actions/weather-actions";

const saveResultToLocalStorage = (key, data) => {
  const searchResult = JSON.parse(localStorage.getItem("searchResult"));
  searchResult[key] = data;
  return localStorage.setItem("searchResult", JSON.stringify(searchResult));
};
const initState = {
  city: { value: "", error: null },
  searchResult: [],
  currentCity: null,
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
      const data = action.payload;
      saveResultToLocalStorage(state.city.value, data);
      return {
        ...state,
        searchResult: data,
      };
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
