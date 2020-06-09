export const SET_SEARCH_CACHE = "[cache] set search cache";
export const SET_CITY_FORECASTS_CACHE = "[cache] set forecasts cache";
export const SET_CITY_CONDITION_CACHE = "[cache] set condition cache";
export const SET_FAVORITES_CACHE = "[cache] set favorites cache";
export const SET_USER_LOCATION_CACHE = "[cache] set user location cache";
export const TOGGLE_FAVORITES = "[cache] toggle favorites";
export const SET_CACHE_READY = "[cache] cache ready";
export const setSearchCache = (payload) => ({
  type: SET_SEARCH_CACHE,
  payload,
});
export const setCityForecastsCache = (payload) => ({
  type: SET_CITY_FORECASTS_CACHE,
  payload,
});
export const setCityConditionCache = (payload) => ({
  type: SET_CITY_CONDITION_CACHE,
  payload,
});
export const setFavoritesCache = (payload) => ({
  type: SET_FAVORITES_CACHE,
  payload,
});
export const toggleFavorites = (payload) => ({
  type: TOGGLE_FAVORITES,
  payload,
});
export const setUserLocationCache = (payload) => ({
  type: SET_USER_LOCATION_CACHE,
  payload,
});
export const setCacheReady = () => ({
  type: SET_CACHE_READY,
});
