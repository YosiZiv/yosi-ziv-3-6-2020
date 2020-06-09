export const FORM_CITY_INPUT_CHANGE = "[weather] form city input change";
export const SET_SEARCH_RESULT = "[weather] set search result";
export const SET_CURRENT_CITY = "[weather] set current city";
export const SET_CITY_CONDITION = "[weather] set city Condition";
export const SET_CITY_FORECASTS = "[weather] set city forecasts";
export const SET_MODE = "[weather]set mode";

// async actions
export const GET_CITIES_START = "[weather] get cities start";
export const GET_CITIES_SUCCESS = "[weather] get cities success";
export const GET_CITIES_FAIL = "[weather] get cities fail";
export const GET_CITY_FORECASTS_START = "[weather] get city forecasts start";
export const GET_CITY_FORECASTS_SUCCESS = "[weather]get city forecasts success";
export const GET_CITY_FORECASTS_FAIL = "[weather] get city forecasts fail";
export const GET_CITY_CONDITION_START = "[weather]get city condition start";
export const GET_CITY_CONDITION_SUCCESS = "[weather]get city condition success";
export const GET_CITY_CONDITION_FAIL = "[weather]get city condition fail";
export const GET_CITY_BY_LOCATION_START =
  "[weather] get city by location start";
export const GET_CITY_BY_LOCATION_SUCCESS =
  "[weather] get city by location success";
export const GET_CITY_BY_LOCATION_FAIL = "[weather] get city by location fail";

export const getCities = (payload) => ({
  type: GET_CITIES_START,
  payload,
});
export const getCityCondition = (payload) => ({
  type: GET_CITY_CONDITION_START,
  payload,
});
export const getCityForecasts = (payload) => ({
  type: GET_CITY_FORECASTS_START,
  payload,
});
export const getCityByLocation = (payload) => ({
  type: GET_CITY_BY_LOCATION_START,
  payload,
});
export const formCityInputChange = (payload) => ({
  type: FORM_CITY_INPUT_CHANGE,
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
export const setCityForecasts = (payload) => ({
  type: SET_CITY_FORECASTS,
  payload,
});
export const setCityCondition = (payload) => ({
  type: SET_CITY_CONDITION,
  payload,
});
export const setMode = (payload) => ({
  type: SET_MODE,
  payload,
});
