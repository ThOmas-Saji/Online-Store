import React from "react";
import { Card, Box } from "@mui/material";
import SideBar from "./SideBar";
import MainBody from "./MainBody";
import style from "./style.module.css"

function Home() {
  return (
    <Card className={style.container} >
      <Box>
        <SideBar />
      </Box>
      <Box>
        <MainBody />
      </Box>
    </Card>
  );
}

export default Home;
