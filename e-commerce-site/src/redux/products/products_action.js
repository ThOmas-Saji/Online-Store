import axios from "axios";

const GET_ONE_PRODUCT = "GET_ONE_PRODUCT";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

const get_one_prod = (payload) => {
  return {
    type: GET_ONE_PRODUCT,
    payload,
  };
};
const get_all_prod = (payload) => {
  return {
    type: GET_ALL_PRODUCTS,
    payload,
  };
};

const get_product = (id) => (dispatch) => {
  axios
    .get(`https://e-commerce--site.herokuapp.com/product/${id}`)
    .then(({ data }) => {
      dispatch(get_one_prod(data[0]));
    })
    .catch((err) => {
      console.log(err);
    });
};
const get_all_products = (category) => (dispatch) => {
  axios
    .get(`https://e-commerce--site.herokuapp.com/products/${category}`)
    .then(({ data }) => {
      dispatch(get_all_prod(data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export { 
  get_product, 
  get_all_products, 
  GET_ALL_PRODUCTS, 
  GET_ONE_PRODUCT };
