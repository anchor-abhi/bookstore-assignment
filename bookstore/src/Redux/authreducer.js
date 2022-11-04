import { LOGIN, LOGOUT } from "./authaction";

const initState = {
  token: "",
  isAuth: false,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        token: payload,
        isAuth: true,
      };
    case LOGOUT:
      return {
        ...state,
        token: "",
        isAuth: false,
      };
    default:
      return state;
  }
};
