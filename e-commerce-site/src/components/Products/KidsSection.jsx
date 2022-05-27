import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sorting from "../Sorting/Sorting";
import style from "./style.module.css";
import StarIcon from "@mui/icons-material/Star";

export const KidsSection = () => {
  const [sorting, setSorting] = useState({
    sortBy: "",
    type: 1,
  });
  const [brand, setBrand] = useState("");
  const [kids, setKids] = useState(false);
  useEffect(() => {
    getKidsData();
    localStorage.setItem("category", "kids");
  }, []);

  function getKidsData() {
    axios
      .get("https://e-commerce--site.herokuapp.com/products/kids")
      .then(({ data }) => {
        setKids(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Sorting
  function handleSorting(sortBy, type) {
    setSorting({ ...sorting, sortBy, type });
  }
  function handleFiltering(brand_name, value) {
    setBrand(value);
  }

  return (
    <Card className={style.container}>
      <Box sx={{ margin: "1rem 0rem" }}>
        <Sorting
          handleSorting={handleSorting}
          handleFiltering={handleFiltering}
        />
        <Typography variant="h6">Kids Section</Typography>
      </Box>
      <Box className={style.products_container}>
        {!kids ? (
          <></>
        ) : (
          kids
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
                      width: "90%",
                      height: "70%",
                    }}
                    src={el.image_url}
                    alt={el.product_name}
                  />
                  <Box className={style.product_details_box}>
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
                  </Box>
                </Card>
              </Link>
            ))
        )}
      </Box>
    </Card>
  );
};
