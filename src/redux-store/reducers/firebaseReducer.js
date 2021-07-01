import { LOGOUT, LOGIN } from "../types/firebase";
import { saveObjectToLocalStorage } from "../../utils/localStorage";
const initialState = {
  user: null,
};
export default function firebaseReducer(
  state = initialState,
  { type, payload },
) {
  switch (type) {
    case LOGIN:
      saveObjectToLocalStorage("user", payload);
      return { ...state, user: payload };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, user: null };
    default:
      return state;
  }
}
