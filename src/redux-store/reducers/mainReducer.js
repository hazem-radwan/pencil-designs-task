import { combineReducers } from "redux";
import firebaseReducer from "./firebaseReducer";
import ProductsReducer from "./productsReducer";

export const mainReducer = combineReducers({
  firebase: firebaseReducer,
  products: ProductsReducer,
});
