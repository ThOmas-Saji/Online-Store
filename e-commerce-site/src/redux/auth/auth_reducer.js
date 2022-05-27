import { GET_USER } from "./auth_action";

const inital = {
  users: [],
};

export const userReducer = (state = inital, { type, payload }) => {
  switch (type) {
    case GET_USER:
      return { ...state, user: payload };
    default:
      return { state };
  }
};
