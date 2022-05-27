import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  Card,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import style from "./style.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [userAddress, setUserAddress] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigateor = useNavigate();

  useEffect(() => {
    getUserAddress();
    getCartData();
  }, []);

  // Make payment
  function makePayment() {
    if (!value1 || !value2 || !value3 || !value4 || !value5) {
      setError(true);
      return;
    } else {
      setError(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Payment Success");
        remove_cart_data();
        navigateor("/");
      }, 2500);
    }
  }
  const remove_cart_data = () => {
    axios
      .delete(`https://e-commerce--site.herokuapp.com/cart`)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // Get grand total

  async function getCartData() {
    try {
      let { data } = await axios.get(`https://e-commerce--site.herokuapp.com/cart`);
      let total = 0;
      data.map((el) => {
        total += el.price * el.quantity;
      });
      setGrandTotal(total);
    } catch (err) {
      console.log(err);
    }
  }
  // Get user Address
  function getUserAddress() {
    axios
      .get(`https://e-commerce--site.herokuapp.com/address/${user._id}`)
      .then(({ data }) => {
        setUserAddress(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Box className={style.container}>
      <h3>Payment Section</h3>

      <Card className={style.payment_card}>
        <Box className={style.payment_box1}>
          {!userAddress ? (
            <></>
          ) : (
            <Box sx={{ width: "100%", textAlign: "left" }}>
              <p>User Details</p>
              <h4>
                {userAddress.full_name}, {userAddress.address},{" "}
                {userAddress.city}, {userAddress.mobile}, {userAddress.state}
              </h4>
            </Box>
          )}
          <hr />
          <p>Other Payment Options</p>
          <Stack direction="row">
            <Box
              sx={{
                cursor: "pointer",
                margin: "0.2rem",
                width: "20%",
                height: "2.5rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <img
                alt="img"
                style={{ width: "100%" }}
                src="data:image/png;base64,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"
              />
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                margin: "0.2rem",
                width: "20%",
                height: "2.5rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <img
                alt="img"
                style={{ width: "100%" }}
                src="data:image/png;base64,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"
              />
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                margin: "0.2rem",
                width: "20%",
                height: "2.5rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <img
                alt="img"
                style={{ width: "100%" }}
                src="data:image/png;base64,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"
              />
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                margin: "0.2rem",
                width: "20%",
                height: "2.5rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <img
                alt="img"
                style={{ width: "100%" }}
                src="https://assets.mspimages.in/wp-content/uploads/2021/07/GooglePay_Lockup.max-1200x1200-1.png"
              />
            </Box>
          </Stack>
        </Box>
        <Box className={style.payment_box2}>
          {error ? (
            <h5 style={{ color: "red" }}>Please fill all the fields</h5>
          ) : (
            ""
          )}
          <Stack spacing={2}>
            <TextField
              size="small"
              type="number"
              label="Card number"
              value={value1}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 16) return;
                setValue1(value);
              }}
            />
            <Stack direction="row">
              <TextField
                value={value2}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length > 2) return;
                  if (value > 12) return;
                  if (value < 0) return;
                  setValue2(value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="month"
                size="small"
                type="number"
                sx={{ width: "5rem" }}
              />
              <TextField
                value={value3}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length > 2) return;
                  if (value < 0) return;
                  setValue3(value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                label="year"
                size="small"
                type="number"
                sx={{ width: "5rem" }}
              />
              <TextField
                value={value4}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length > 3) return;
                  setValue4(value);
                }}
                label="CVV"
                type="number"
                size="small"
                sx={{ width: "6rem", marginLeft: "5rem" }}
              />
            </Stack>
            <TextField
              value={value5}
              onChange={(e) => {
                let value = e.target.value;
                setValue5(value);
              }}
              color="secondary"
              type="text"
              size="small"
              label="name on Card"
              sx={{ width: "30rem" }}
            />
            <Button
              onClick={() => makePayment()}
              variant="contained"
              color="success"
            >
              {loading ? <CircularProgress /> : `Make payment ₹${grandTotal}`}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}

export default Payment;
