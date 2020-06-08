import { combineReducers } from "redux";
import ui from "./ui";
import weatherReducer from "./weather-reducer";
import favoritesReducer from "./favorites-reducer";
export const reducers = combineReducers({
  ui,
  weatherReducer,
  favoritesReducer,
});
