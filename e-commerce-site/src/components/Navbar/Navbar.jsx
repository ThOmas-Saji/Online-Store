import { Box, Card, ButtonGroup, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { ShoppingCartRounded } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const [active, setActive] = useState(false);
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      return;
    } else {
      return;
    }
  }, []);

  // User logout
  function handleLogout() {
    let res = window.confirm("Are you sure want to Logout ?");
    if (res) {
      localStorage.clear();
      window.location.reload(false);
    } else {
      return;
    }
  }
  return (
    <Card className={style.container}>
      <Card className={active ? style.user_Details_active : style.user_Details}>
        <h3
          style={{
            border: "1px solid black",
            width: "15%",
            marginLeft: "80%",
            color: "white",
            backgroundColor: "red",
            cursor: "pointer",
          }}
          onClick={() => setActive(false)}
        >
          X
        </h3>
        <p style={{ fontSize: "12px" }}>email {user?.email}</p>
        <Button onClick={handleLogout} color="warning" variant="contained">
          Logout
        </Button>
      </Card>
      <Box
        sx={{
          margin: "2rem 2rem 0rem 0rem",
        }}
      >
        <span>
          <Link className="link_tag_style" to="/cart">
            <ShoppingCartRounded
              className={style.cart_icon}
            ></ShoppingCartRounded>
          </Link>
        </span>
      </Box>
      {token ? (
        <Box
          sx={{
            margin: "2rem 2rem 0rem 0rem",
            display: "flex",
            width: "10%",
            // border:"1px solid black"
          }}
        >
          <PersonIcon
            sx={{ cursor: "pointer" }}
            onClick={() => setActive(true)}
          ></PersonIcon>
          <p style={{ fontSize: "12px" }}>{user.full_name}</p>
        </Box>
      ) : (
        <Stack sx={{ margin: "1.6rem" }} direction="column">
          <ButtonGroup variant="contained">
            <Button
              onClick={() => {
                navigate("/register");
              }}
              color="info"
            >
              Register
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              color="success"
            >
              Login
            </Button>
          </ButtonGroup>
        </Stack>
      )}
      <Box className={style.site_name}>
        <Link className="link_tag_style" to="/">
          <h1>Online Store</h1>
        </Link>
      </Box>
    </Card>
  );
}

export default Navbar;
