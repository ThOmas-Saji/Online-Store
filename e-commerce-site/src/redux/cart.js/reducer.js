import { GET_CART_DATA } from "./action";

const initial = {
  cart: [],
};

export const cartReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case GET_CART_DATA:
      return { ...state, cart: payload };
    default:
      return { state };
  }
};
