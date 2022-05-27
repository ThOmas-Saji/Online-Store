import React, { useState } from "react";
import { Box, Button, Card } from "@mui/material";
import axios from "axios";

function EditQuantity({ defaualtVlaue, cart_id }) {
  const [quantity, setQuantity] = useState(defaualtVlaue);

  const handleQuantity = (value) => {
    if (value + quantity < 1 || value + quantity >= 11) {
      return;
    } else {
      setQuantity((prev) => prev + value);
    }
  };
  async function updateCartData() {
    try {
      await axios.patch(`https://e-commerce--site.herokuapp.com/cart/${cart_id}`, {
        quantity:quantity
      });
      window.location.reload(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box
      sx={{
        margin: "auto",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Card
        sx={{
          margin: "auto",
          marginTop: "1rem",
          paddingBottom: "1rem",
          width: "50%",
        }}
      >
        <span>
          {" "}
          Quantity : <h4>{quantity}</h4>
        </span>
        <Button sx={{ height: "1vh" }} onClick={() => handleQuantity(-1)}>
          {" "}
          <p>-</p>{" "}
        </Button>
        <Button sx={{ height: "1vh" }} onClick={() => handleQuantity(1)}>
          {" "}
          <p>+</p>
        </Button>
        <Button
         sx={{ marginTop:"1rem"}}
          size="small"
          variant="contained"
          onClick={() => updateCartData()}
        >
          Done
        </Button>
      </Card>
    </Box>
  );
}

export default EditQuantity;
