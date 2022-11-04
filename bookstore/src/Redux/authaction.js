export const LOGIN = "login/user";
export const LOGOUT = "logout/user";

export const loginUser = (payload) => ({
  type: LOGIN,
  payload,
});
export const logoutUser = () => ({ type: LOGOUT });
