import axios from "axios";

const GET_USER = "GET_USER";

const login_user = (payload) => {
  return {
    type: GET_USER,
    payload,
  };
};

const post_user = (userData) => (dispacth) => {
  axios
    .post("https://e-commerce--site.herokuapp.com/register", userData)
    .then(() => {
      alert("Signup success.");
    })
    .catch((err) => {
      alert("Provide Correct Data.");
      console.log(err);
    });
};
const get_user = (userData) => (dispacth) => {
  axios
    .post("https://e-commerce--site.herokuapp.com/login", userData)
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
     localStorage.setItem("user", JSON.stringify(data.user));
      dispacth(login_user(data));
      alert("Login success.");
      window.location.reload(false)
    })
    .catch((err) => {
      alert("Provide Correct E-mail or Password.");
      console.log(err);
    });
};

export { post_user, get_user, GET_USER };
