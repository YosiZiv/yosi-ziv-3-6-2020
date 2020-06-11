import {
  LOADING_START,
  LOADING_FINISH,
  SET_MESSAGE,
  DELETE_MESSAGE,
  CLEAR_UI,
  REDIRECT,
  CHANGE_THEME_MODE,
} from "../actions/ui";
const initState = {
  loading: false,
  messages: {},
  redirect: null,
  themeMode: "dark",
};

export default function ui(state = initState, action) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_FINISH:
      return { ...state, loading: false };
    case SET_MESSAGE:
      return { ...state, messages: action.payload };
    case REDIRECT: {
      return {
        ...state,
        redirect: action.payload,
      };
    }
    case DELETE_MESSAGE: {
      delete state.messages[action.payload];
      return { ...state, messages: state.messages };
    }
    case CHANGE_THEME_MODE: {
      const themeMode = state.themeMode === "dark" ? "light" : "dark";
      return { ...state, themeMode };
    }
    case CLEAR_UI: {
      return {
        ...initState,
      };
    }
    default:
      return state;
  }
}
