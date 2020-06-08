export const SET_FAVORITES = "[favorites]set favorites";
export const TOGGLE_FAVORITES = "[favorites]toggle favorites";
export const setFavorites = (payload) => ({
  type: SET_FAVORITES,
  payload,
});
export const toggleFavorites = (payload) => ({
  type: TOGGLE_FAVORITES,
  payload,
});
