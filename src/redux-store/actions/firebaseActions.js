import { LOGIN, LOGOUT } from "../types/firebase";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
