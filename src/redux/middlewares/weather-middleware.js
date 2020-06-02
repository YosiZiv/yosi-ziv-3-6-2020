import { apiRequest } from "../actions/api";
import {
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAIL,
} from "../actions/weather-actions";
const getCityMid = ({ dispatch }) => (next) => (action) => {
  if (action.type === GET_CITY) {
    const URL = "/comments";
    return dispatch(
      apiRequest(
        "get",
        URL,
        null,
        { postId: "1" },
        GET_CITY_SUCCESS,
        GET_CITY_FAIL
      )
    );
  }
  next(action);
};
export const weatherMdl = [getCityMid];
