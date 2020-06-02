import { applyMiddleware, createStore, compose } from "redux";
import { reducers } from "./reducers";
import { api } from "./middlewares/api";
import { weatherMdl } from "./middlewares/weather-middleware";
// dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(api, ...weatherMdl))
);
