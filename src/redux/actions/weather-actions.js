export const GET_CITY = "[weather] get city";
export const GET_CITY_SUCCESS = "[weather] get city";
export const GET_CITY_FAIL = "[weather] get city";
export const getCity = (payload) => ({
  type: GET_CITY,
  payload,
});
