import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import style from "./style.module.css";
import Sorting from "../Sorting/Sorting";
import { Link } from "react-router-dom";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

export default function Mens() {
  const [sorting, setSorting] = useState({
    sortBy: "",
    type: 1,
  });
  const [brand, setBrand] = useState("");
  const [mens, setMens] = useState(false);

  useEffect(() => {
    getmensData();
    localStorage.setItem("category", "men");
  }, []);

  function getmensData() {
    axios
      .get("https://e-commerce--site.herokuapp.com/products/men")
      .then(({ data }) => {
        setMens(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSorting(sortBy, type) {
    setSorting({ ...sorting, sortBy, type });
  }
  function handleFiltering(brand_name, value) {
    setBrand(value);
  }

  return (
    <Card>
      <Box sx={{ margin: "1rem 0rem" }}>
      <Sorting
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
      />
        <h5>Mens Fashions</h5>
      </Box>
      <Box className={style.products_container}>
        {!mens ? (
          <></>
        ) : (
          mens
            .sort((a, b) =>
              sorting.sortBy === "price"
                ? sorting.type === 1
                  ? a.price - b.price
                  : b.price - a.price
                : sorting.sortBy === "name"
                ? sorting.type === 1
                  ? a.product_name.localeCompare(b.product_name)
                  : b.product_name.localeCompare(a.product_name)
                : true
            )
            .filter((el) => (!brand ? true : el.brand === brand))
            .map((el, i) => (
              <Link
                key={i}
                className="link_tag_style"
                to={`/product/${el._id}`}
              >
 
                <Card className={style.item_container}>
                <Typography color="error" variant="h6">{el.product_name}</Typography> 
                  <img
                    style={{
                      width: "98%",
                      height: "60%",
                    }}
                    src={el.image_url}
                    alt={el.product_name}
                  />
                 <Typography gutterBottom variant="p">{el.brand}</Typography> <br /> 
                  <Typography gutterBottom variant="p"><StarIcon sx={{ fontSize:"14px",color:"teal"}}></StarIcon> {el.rating}</Typography> 
                  <br /><Typography variant="h6">₹ {el.price}</Typography> 
                </Card>
              </Link>
            ))
        )}
      </Box>
    </Card>
  );
}
