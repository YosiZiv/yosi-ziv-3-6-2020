import { API_REQUEST } from "../actions/api";
import { loadingStart, loadingFinish } from "../actions/ui";
import { axios } from "../../axios";
// this middleware care only for API calls
export const api = ({ dispatch }) => (next) => (action) => {
  if (action.type === API_REQUEST) {
    dispatch(loadingStart());
    const {
      method = "get",
      url,
      body = null,
      params = null,
      onSuccess,
      onError,
    } = action.meta;
    axios({ method, url, params })
      .then((response) => {
        console.log(response);
        dispatch(loadingFinish());
        // dispatch({ type: onSuccess, payload: response.data });
      })
      .catch((error) => {
        console.log(error);

        dispatch(loadingFinish());
        dispatch({ type: onError, payload: error.response });
      });
  }
  return next(action);
};
