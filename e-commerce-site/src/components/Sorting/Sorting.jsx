import React from 'react'
import { Box } from '@mui/material'
import style from "./style.module.css"

export default function Sorting({handleSorting, handleFiltering}) {

  function handleChange(e) {
    const { name, value } = e.target
    let no = 1;
    if(value === "dsc" || value === "hl" ){
      no = 0;
    }
    handleSorting(name, no)
  }
  function handleFilter(e) {
    const { name, value } = e.target
    handleFiltering(name, value)
  }
  return (
    <Box className={style.sort_box}>
       <Box><label >Sort By Name</label>
       <select name='name' onChange={(e)=>handleChange(e)}> 
        <option >Select</option>
        <option value="asc">ASC</option>
        <option value="dsc">DSC</option>
      </select></Box>
       <Box><label >Sort By Price</label>
       <select name='price' onChange={(e)=>handleChange(e)}> 
       <option >Select</option>
        <option value="lh">Low - High</option>
        <option value="hl">High - Low</option>
      </select></Box>
       <Box><label >Filter By Brand</label>
       <select name='brand' onChange={(e)=>handleFilter(e)}> 
       <option >Select</option>
        <option value="Adidas">Adidas</option>
        <option value="Puma">Puma</option>
        <option value="Otto">Otto</option>
        <option value="Tommy">Tommy</option>
      </select></Box>
    </Box>
  )
}
