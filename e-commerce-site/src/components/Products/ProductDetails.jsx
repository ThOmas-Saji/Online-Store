import { useParams, Link } from "react-router-dom";
import { Card, Box, Button, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Quantity from "../Quantity/Quantity";
import style from "./style.module.css";
import { get_product } from "../../redux/products/products_action";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const category = localStorage.getItem("category") || null;

  const [addedtoCart, setAddedtoCart] = useState(false);
  const [_id, set_id] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [prodName, setProdName] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState({
    user: "",
    image_url: prodImage,
    product_name: prodName,
    price: prodPrice,
    item: "",
    category,
    quantity,
  });

  useEffect(() => {
    getSingleProductDetails();
    getCartData();
    dispatch(get_product(id));
  }, []);

  //add to cart
  async function addToCart() {
    cartItem.user = user._id;
    cartItem.item = product._id;
    cartItem.image_url = prodImage;
    cartItem.product_name = prodName;
    cartItem.price = prodPrice;
    cartItem.quantity = quantity;
    setLoading(true);
    try {
      await axios.post("https://e-commerce--site.herokuapp.com/cart", cartItem);
      getCartData();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }
  // get single product
  const getSingleProductDetails = () => {
    axios
      .get(`https://e-commerce--site.herokuapp.com/product/${id}`)
      .then(({ data }) => {
        setProdImage(data[0].image_url);
        setProdName(data[0].product_name);
        setProdPrice(data[0].price);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get cart Data
  async function getCartData() {
    try {
      let { data } = await axios.get(
        `https://e-commerce--site.herokuapp.com/cart`
      );
      data = data.filter((el) => el.item == id);
      if (data.length > 0) {
        setAddedtoCart(true);
        set_id(data[0]._id);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // remove from cart
  async function removeFromCart() {
    setLoading(true);
    try {
      await axios.delete(`https://e-commerce--site.herokuapp.com/cart/${_id}`);
      setTimeout(() => {
        setLoading(false);
        setAddedtoCart(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  // handle Quantity
  function calculateQuantity(count) {
    setQuantity(count);
  }
  return (
    <Card>
      {!product ? (
        <></>
      ) : (
        <Box className={style.single_prod_box}>
          <Box sx={{ width: "100%", margin: "1rem" }}>
            <img
              style={{ width: "100%", margin: "1rem" }}
              src={product.image_url}
              alt={product.product_name}
            />
          </Box>
          <Box
            sx={{
              width: "90%",
              margin: "2rem",
            }}
          >
            <Box>
              <h2>{product.category}</h2>
              <h4>{product.description}</h4>
              <Typography color="primary" gutterBottom variant="h5">
                <StarIcon sx={{ fontSize: "20px", color: "teal" }}></StarIcon>{" "}
                {product.rating}
              </Typography>
              <h1>Price ₹{product.price}</h1>

              {addedtoCart ? (
                <></>
              ) : (
                <Quantity calculateQuantity={calculateQuantity} />
              )}
              <p>Brand : {product.brand}</p>
            </Box>
            {token ? (
              <Box>
                {addedtoCart ? (
                  <Button
                    onClick={() => removeFromCart()}
                    variant="contained"
                    color="error"
                  >
                    {loading ? (
                      <CircularProgress
                        sx={{ color: "white" }}
                      ></CircularProgress>
                    ) : (
                      `Remove`
                    )}
                  </Button>
                ) : (
                  <Button onClick={() => addToCart()} variant="contained">
                    {loading ? (
                      <CircularProgress
                        sx={{ color: "white" }}
                      ></CircularProgress>
                    ) : (
                      `Add to Cart`
                    )}
                  </Button>
                )}
              </Box>
            ) : (
              <Link className="link_tag_style" to="/register">
                {" "}
                <Button>Login/Signup</Button>{" "}
              </Link>
            )}
          </Box>
        </Box>
      )}{" "}
    </Card>
  );
}
