import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import Sorting from "../Sorting/Sorting";
import { Link } from "react-router-dom";
import { get_all_products } from "../../redux/products/products_action";
import StarIcon from "@mui/icons-material/Star";

export default function Women() {
  const [sorting, setSorting] = useState({
    sortBy: "",
    type: 1,
  });
  const [brand, setBrand] = useState("");
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(get_all_products("women"));
    localStorage.setItem("category", "women");
  }, []);

  // sorting functions
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
        <h5>Women's Fashion</h5>
      </Box>

      <Box className={style.products_container}>
        {!products ? (
          <></>
        ) : (
          products
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
                {" "}
                <Card className={style.item_container}>
                  <Typography color="error" variant="h6">
                    {el.product_name}
                  </Typography>
                  <img
                    style={{
                      width: "98%",
                      height: "60%",
                    }}
                    src={el.image_url}
                    alt={el.product_name}
                  />
                  <Typography gutterBottom variant="p">
                    {el.brand}
                  </Typography>{" "}
                  <br />
                  <Typography gutterBottom variant="p">
                    <StarIcon
                      sx={{ fontSize: "14px", color: "teal" }}
                    ></StarIcon>{" "}
                    {el.rating}
                  </Typography>
                  <br />
                  <Typography variant="h6">₹ {el.price}</Typography>
                </Card>
              </Link>
            ))
        )}
      </Box>
    </Card>
  );
}
