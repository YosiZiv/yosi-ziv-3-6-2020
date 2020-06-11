import {
  LOADING_START,
  LOADING_FINISH,
  SET_MESSAGE,
  CLEAR_UI,
  REDIRECT,
  CHANGE_THEME_MODE,
} from "../actions/ui";
const initState = {
  loading: false,
  message: null,
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
      return { ...state, message: action.payload };
    case REDIRECT: {
      return {
        ...state,
        redirect: action.payload,
      };
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
