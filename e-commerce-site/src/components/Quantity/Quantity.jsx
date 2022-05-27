import { Card, Box, Button } from "@mui/material";
import React, { useState } from "react";

export default function Quantity({calculateQuantity}) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (value) => {
    if (value + quantity < 1 || value + quantity >= 11) {
      return;
    } else {
      setQuantity((prev) => {
        calculateQuantity(prev + value);
        return prev + value;
      });
    }
    
  };
  return (
    <Box sx={{ 
      margin:"auto", 
      textAlign: "center",
       width:"100%" }}>  
      <Card  sx={{ margin:"auto", marginTop:"1rem", paddingBottom:"1rem",   width:"50%"}}> 
       <span> Quantity : <h4>{quantity}</h4></span>
        <Button  sx={{ height :"5vh"}} onClick={() => handleQuantity(-1)}>
          {" "}
          <h1>-</h1>{" "}
        </Button>
        <Button sx={{ height :"5vh"}} onClick={() => handleQuantity(1)}>
          {" "}
          <h1>+</h1>
        </Button>
      </Card>
    </Box>
  );
}
