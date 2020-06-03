export const FORM_CITY_INPUT_CHANGE = "[weather] form city input change";
export const GET_CITIES_START = "[weather] get cities start";
export const GET_CITIES_SUCCESS = "[weather] get cities success";
export const GET_CITIES_FAIL = "[weather] get cities fail";
export const FORM_SET_CITIES = "[weather] form set cities";
export const SET_SEARCH_RESULT = "[weather] set search result";
export const SET_CURRENT_CITY = "[weather] set current city";

export const formCityInputChange = (payload) => ({
  type: FORM_CITY_INPUT_CHANGE,
  payload,
});
export const getCities = (payload) => ({
  type: GET_CITIES_START,
  payload,
});
export const formSetCities = (payload) => ({
  type: FORM_SET_CITIES,
  payload,
});
export const setCurrentCity = (payload) => ({
  type: SET_CURRENT_CITY,
  payload,
});
export const setSearchResult = (payload) => ({
  type: SET_SEARCH_RESULT,
  payload,
});
