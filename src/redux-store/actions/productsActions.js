import  { REMOVE_PRODUCT , SET_PRODUCTS} from "../types/products"
export const removeProduct = (id) => {
  return {
    type: REMOVE_PRODUCT,
    payload: id,
  };
};
export const setProducts = (payload) => {
  return {
    type: SET_PRODUCTS,
    payload,
  };
};
