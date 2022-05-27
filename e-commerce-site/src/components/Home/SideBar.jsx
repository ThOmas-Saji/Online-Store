import React from "react";
import { Button, Card } from "@mui/material";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <Card className={style.side_bar_box}>
      <Link className="link_tag_style" to="/mens">
        {" "}
        <Button className={style.sidebar_buttons} variant="ghost">
          Men
        </Button>
      </Link>
      <Link className="link_tag_style" to="/women">
        <Button className={style.sidebar_buttons} variant="ghost">
          Women
        </Button>
      </Link>
      <Link className="link_tag_style" to="/kids">
      <Button className={style.sidebar_buttons} variant="ghost">
        Kids
      </Button>
      </Link>
    </Card>
  );
}
