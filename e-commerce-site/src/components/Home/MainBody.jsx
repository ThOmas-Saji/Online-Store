import React from "react";
import { Card,Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export default function MainBody() {
const navigate = useNavigate()
  const offers =[
    {
      "offer_name": "30% Discount for women's Dress",
      "image_url": "https://i.pinimg.com/originals/b8/55/cd/b855cdff7dc637dbdae79c0ba92818b9.jpg",
      "shop": "shop now",
      category:"women"
    },
    {
      "offer_name": "50% Discount for men's T-shirt",
      "image_url": "https://i.pinimg.com/originals/43/fd/d3/43fdd3ea1eae26cbcb201df871738e5b.jpg",
      "shop": "shop now",
      category:"mens"
    },
    {
      "offer_name": "70% Discount for kid's cloths",
      "image_url": "https://thumbs.dreamstime.com/b/group-fashion-cute-preschooler-kids-friends-running-together-looking-camera-white-studio-background-friendship-132348307.jpg",
      "shop": "shop now",
      category:"kids"
    }
  ]

  return (
    <Card className={style.main_body_container}>
      {!offers ? <></> : offers.map((el, i)=>(
        <Card className={style.offers_container} key={i}>
          <img style={{ width:"98%" }} src={el.image_url}  alt={el.offer_name}/>
          <h2>{el.offer_name}</h2>
          <Button variant="contained" onClick={()=>(navigate(`/${el.category}`))}>{el.shop}</Button>
          </Card>

      ))}
    </Card>
  );
}
