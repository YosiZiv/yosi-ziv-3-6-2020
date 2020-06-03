import { apiRequest } from "../actions/api";
import { apikey } from "../../apikey";
import {
  GET_CITIES_START,
  formSetCities,
  FORM_CITY_INPUT_CHANGE,
  GET_CITIES_SUCCESS,
  GET_CITIES_FAIL,
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
    dispatch(formSetCities(data));
  }
  next(action);
};
const getCitesFail = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITIES_FAIL) {
  }
  next(action);
};
export const weatherMdl = [getCitiesStart, getCitesSuccess, getCitesFail];
