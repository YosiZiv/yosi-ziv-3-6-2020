export const API_REQUEST = "[Api] API Request";

export const apiRequest = (
  method,
  url,
  body,
  params,
  onSuccess,
  onError,
  data = null
) => {
  return {
    type: API_REQUEST,
    meta: { method, url, body, params, onSuccess, onError },
    data,
  };
};
