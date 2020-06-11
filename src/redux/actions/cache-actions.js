export const SET_CACHE = "[cache] set cache";
export const SET_CACHE_READY = "[cache] cache ready";
export const TOGGLE_FAVORITES = "[cache] toggle favorites";
export const setCache = (payload) => ({
  type: SET_CACHE,
  payload,
});
export const setCacheReady = () => ({
  type: SET_CACHE_READY,
});

export const toggleFavorites = (payload) => ({
  type: TOGGLE_FAVORITES,
  payload,
});
