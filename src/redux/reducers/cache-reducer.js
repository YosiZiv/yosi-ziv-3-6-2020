import {
  SET_SEARCH_CACHE,
  SET_CITY_CONDITION_CACHE,
  SET_CITY_FORECASTS_CACHE,
  SET_FAVORITES_CACHE,
  TOGGLE_FAVORITES,
} from "../actions/cache-actions";
import { saveCache } from "../../utils";

const initState = {
  searchCache: {},
  forecastsCache: {},
  conditionCache: {},
  favoritesCache: {},
};

export default function weatherReducer(state = initState, action) {
  switch (action.type) {
    case SET_SEARCH_CACHE: {
      const { item, key, data } = action.payload;
      if (!data && !key) {
        return { ...state, searchCache: { ...item } };
      }
      const searchCache = state.searchCache;
      searchCache[key] = data;
      saveCache("searchCache", searchCache);
      return { ...state, searchCache };
    }
    case SET_CITY_FORECASTS_CACHE: {
      const { item, key, data } = action.payload;
      if (!data && !key) {
        return { ...state, forecastsCache: { ...item } };
      }
      const forecastsCache = state.forecastsCache;
      forecastsCache[key] = data;
      saveCache("forecastsCache", forecastsCache);
      return { ...state, forecastsCache };
    }
    case SET_CITY_CONDITION_CACHE: {
      const { item, key, data } = action.payload;
      if (!data && !key) {
        return { ...state, conditionCache: { ...item } };
      }
      const conditionCache = state.conditionCache;
      conditionCache[key] = data;
      saveCache("conditionCache", conditionCache);
      return { ...state, conditionCache };
    }
    case SET_FAVORITES_CACHE: {
      const { item, key, data } = action.payload;
      if (!data && !key) {
        return { ...state, favoritesCache: { ...item } };
      }
      const favoritesCache = state.favoritesCache;
      favoritesCache[key] = data;
      saveCache("favoritesCache", favoritesCache);
      return { ...state, favoritesCache };
    }
    case TOGGLE_FAVORITES: {
      console.log(action.payload);

      const { cityName, key } = action.payload;
      const favoritesCache = state.favoritesCache;
      if (favoritesCache[cityName]) {
        delete favoritesCache[cityName];
      } else {
        favoritesCache[cityName] = key;
      }
      saveCache("favoritesCache", favoritesCache);
      return {
        ...state,
        favoritesCache: { ...favoritesCache },
      };
    }
    default:
      return state;
  }
}
