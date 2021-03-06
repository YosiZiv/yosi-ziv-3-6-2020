import { combineReducers } from "redux";
import ui from "./ui";
import weatherReducer from "./weather-reducer";
import cacheReducer from "./cache-reducer";
export const reducers = combineReducers({
  ui,
  weatherReducer,
  cacheReducer,
});
