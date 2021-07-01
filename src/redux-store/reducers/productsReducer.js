import { REMOVE_PRODUCT, SET_PRODUCTS } from "../types/products";

export default function ProductsReducer(state = [], { type, payload }) {
  switch (type) {
    case REMOVE_PRODUCT:
      return [...state.filter((product) => product.id !== payload)];
    case SET_PRODUCTS:
      return [...payload];
    default:
      return state;
  }
}
