import { SET_FAVORITES, TOGGLE_FAVORITES } from "../actions/favorites-actions";

const favoritesCache = (key, data) => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  favorites[key] = data;
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return favorites;
};
const initState = {
  favorites: {},
};

export default function favoritesReducer(state = initState, action) {
  switch (action.type) {
    case SET_FAVORITES: {
      return { ...state, favorites: action.payload };
    }
    case TOGGLE_FAVORITES: {
      const favorites = state.favorites;
      if (favorites[action.payload]) {
        favorites[action.payload] = false;
      } else {
        favorites[action.payload] = true;
      }
      favoritesCache(action.payload, favorites[action.payload]);
      return {
        ...state,
        favorites: { ...favorites },
      };
    }
    default:
      return state;
  }
}
