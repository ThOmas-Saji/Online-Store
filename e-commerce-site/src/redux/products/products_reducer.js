import { GET_ALL_PRODUCTS, GET_ONE_PRODUCT } from "./products_action";

const inital = {
  product: {},
  producsts: [],
};

export const productReducer = (state = inital, { type, payload }) => {
  switch (type) {
    case GET_ONE_PRODUCT:
      return { ...state, product: payload };
    case GET_ALL_PRODUCTS:
      return { ...state, products: payload };
    default:
      return { state };
  }
};
