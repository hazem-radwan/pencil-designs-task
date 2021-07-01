import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainReducer } from "./reducers/mainReducer";
import thunk from "redux-thunk";
export const Store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
