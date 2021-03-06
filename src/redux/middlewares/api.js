import { API_REQUEST } from "../actions/api";
import { loadingStart, loadingFinish } from "../actions/ui";
import { axios } from "../../axios";
// this middleware care only for API calls
export const api = ({ dispatch }) => (next) => async (action) => {
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
    try {
      const response = await axios({ method, url, body, params });

      dispatch(loadingFinish());
      dispatch({
        type: onSuccess,
        payload: response.data,
        data: action.data,
      });
    } catch (error) {
      dispatch(loadingFinish());
      dispatch({ type: onError, payload: error.response });
    }
  }
  next(action);
};
