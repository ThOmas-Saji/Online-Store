import { Box, Card } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "../CartPage.jsx/CartPage";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Mens from "../Products/Mens";
import Women from "../Products/Women";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Payment from "../Payment/Payment";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import { KidsSection } from "../Products/KidsSection";
import ProductDetails from "../Products/ProductDetails";

export default function AllRoutes() {
  return (
    <Card>
      <Navbar />
      <Box sx={{ height: "15vh" }}></Box>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<KidsSection />} />
          <Route path="/product/:id" element={<ProductDetails />} />     
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </ScrollToTop>
    </Card>
  );
}
