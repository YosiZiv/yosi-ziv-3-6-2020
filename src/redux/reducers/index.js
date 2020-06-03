import { combineReducers } from "redux";
import ui from "./ui";
import weatherReducer from "./weather-reducer";
export const reducers = combineReducers({
  ui,
  weatherReducer,
});
