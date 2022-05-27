import {
  legacy_createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./auth/auth_reducer";
import { cartReducer } from "./cart.js/reducer";
import { productReducer } from "./products/products_reducer";

const root_reducers = combineReducers({
  cart: cartReducer,
  users: userReducer,
  product: productReducer
});

export const store = legacy_createStore(
  root_reducers,
  compose(applyMiddleware(thunk))
);
