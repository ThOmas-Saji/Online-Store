import axios from "axios";
const GET_CART_DATA = "GET_CART_DATA";

const get_cart_items = (payload) => {
  return {
    type: GET_CART_DATA,
    payload,
  };
};

const get_cart_data = () => (dispatch) => {
  axios
    .get(`https://e-commerce--site.herokuapp.com/cart`)
    .then(({ data }) => {
      dispatch(get_cart_items(data));
    })
    .catch((err) => {
      console.log(err);
    });
};


const remove_cart_data = (id) => {
  axios
  .delete(`https://e-commerce--site.herokuapp.com/cart/${id}`)
    .then(() => {
    //  get_cart_data()
    })
    .catch((err) => {
      console.log(err);
    });
};
export { get_cart_data, remove_cart_data, GET_CART_DATA };
