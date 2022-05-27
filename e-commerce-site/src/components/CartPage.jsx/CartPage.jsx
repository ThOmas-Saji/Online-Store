import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import EditQuantity from "../Quantity/EditQuantity";
import TotalTable from "./TotalTable";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function CartPage() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [editQuantity, setEditQuantity] = useState(false);
  const [addressSave, setAddressSave] = useState(false);
  const [missingAddress, setMissingAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cart_data, setCart_Data] = useState("");
  const [address, setAddress] = useState({
    user: "",
    full_name: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    mobile: "",
  });
  const token = localStorage.getItem("token") || null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      getCart_data();
      return;
    } else {
      return;
    }
  }, []);

  const getCart_data = () => {
    axios
      .get(`https://e-commerce--site.herokuapp.com/cart`)
      .then(({ data }) => {
        setCart_Data(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove from cart
  async function removeFromCart(_id) {
    try {
      await axios.delete(`https://e-commerce--site.herokuapp.com/cart/${_id}`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  // User details handler
  function handleChanges(e) {
    const { value, name } = e.target;
    setAddress({ ...address, [name]: value });
  }
  function submitAddress() {
    if (
      !address.full_name ||
      !address.address ||
      !address.pincode ||
      !address.city ||
      !address.state ||
      !address.mobile
    ) {
      setMissingAddress(true);
      return;
    } else {
      setLoading(true);
      setMissingAddress(false);
      setTimeout(() => {
        setLoading(false);
        setAddressSave(true);
      }, 1500);
      address.user = user._id;
      postAddress(address);
      // dispatch(post_address(address));
    }
  }

  // post Address
  const postAddress = (address_data) => {
    axios
      .post("https://e-commerce--site.herokuapp.com/address", address_data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <h3>Cart and Checkout Page</h3>
      {token ? (
        <Card className={style.container}>
          <Box className={style.cart_items_box}>
            {!cart_data ? (
              <></>
            ) : (
              cart_data.map((el, i) => (
                <Box className={style.product_view} key={i}>
                  <Box sx={{ width: "30%" }}>
                    <img
                      style={{ width: "100%", height: "90%" }}
                      src={el.image_url}
                      alt="img"
                    />
                  </Box>
                  <Box sx={{ width: "60%" }}>
                    {!editQuantity ? (
                      <Box>
                        <h3>Name : {el.product_name}</h3>
                        <h5>Price : ₹ {el.price} </h5>
                        <span>Selected quantity : {el.quantity}</span>
                        <br />{" "}
                        <Button
                          onClick={() => setEditQuantity(true)}
                          sx={{ marginTop: "1rem" }}
                          size="small"
                          variant="contained"
                          color="success"
                        >
                          {" "}
                          Edit
                        </Button>
                      </Box>
                    ) : (
                      <EditQuantity
                        defaualtVlaue={el.quantity}
                        cart_id={el._id}
                      />
                    )}
                  </Box>
                  <Box>
                    {" "}
                    <IconButton
                      onClick={() => removeFromCart(el._id)}
                      variant="outlined"
                      size="small"
                      color="error"
                    >
                      {" "}
                      <DeleteOutlineIcon />{" "}
                    </IconButton>
                  </Box>
                </Box>
              ))
            )}
          </Box>

          {/* Total Table */}
          <Box sx={{ width: "90%", marginLeft: "2rem" }}>
            <TotalTable />

            {/*Address Input */}
            <Box
              //  className={style.address_inputs}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "1rem",
              }}
              noValidate
              autoComplete="off"
            >
              {!addressSave ? (
                <Box>
                  {missingAddress ? (
                    <h5 style={{ color: "red" }}>Please fill all the fields</h5>
                  ) : (
                    <h3>Enter Details</h3>
                  )}
                  <TextField
                    name="full_name"
                    size="small"
                    type="text"
                    label="Full name *"
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                  <TextField
                    name="address"
                    type="text"
                    multiline
                    rows={4}
                    label="Address"
                    required
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                  <TextField
                    name="pincode"
                    type="number"
                    size="small"
                    label="Pincode *"
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                  <TextField
                    name="city"
                    type="text"
                    size="small"
                    label="City *"
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                  <TextField
                    name="state"
                    type="text"
                    size="small"
                    label="State *"
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                  <TextField
                    name="mobile"
                    size="small"
                    type="number"
                    label="Mobile *"
                    variant="outlined"
                    onChange={(e) => handleChanges(e)}
                  />
                </Box>
              ) : (
                <></>
              )}
              {!addressSave ? (
                <Button
                  onClick={submitAddress}
                  sx={{ marginTop: "0.5rem" }}
                  variant="outlined"
                  disabled={!cart_data.length ? true : false}
                >
                  {" "}
                  {loading ? <CircularProgress /> : "Save"}
                </Button>
              ) : (
                <Box>
                  <Button
                    sx={{ marginTop: "0.5rem", marginRight: "1rem" }}
                    color="primary"
                    variant="outlined"
                    onClick={() => setAddressSave(false)}
                  >
                    Change Address
                  </Button>
                  <Link className="link_tag_style" to="/payment">
                    {" "}
                    <Button
                      sx={{ marginTop: "0.5rem" }}
                      color="success"
                      variant="contained"
                    >
                      Checkout
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Card>
      ) : (
        <Link className="link_tag_style" to="/register">
          {" "}
          <Button>Login/Signup</Button>{" "}
        </Link>
      )}
    </Box>
  );
}
