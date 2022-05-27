import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card } from "@mui/material";
import axios from "axios";
import style from "./style.module.css";
import { get_cart_data } from "../../redux/cart.js/action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TotalTable() {
  const dispatch = useDispatch();
  const cart_data = useSelector((store) => store.cart.cart);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    getCartData();
    dispatch(get_cart_data());
  }, []);

  async function getCartData() {
    try {
      let { data } = await axios.get(`https://e-commerce--site.herokuapp.com/cart`);
      let total = 0;
      data.map((el) => {
        total += el.price * el.quantity;
      });
      setGrandTotal(total);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Price Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart_data ? (
              cart_data.map((el, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {el.product_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{el.quantity}</StyledTableCell>
                  <StyledTableCell align="right">₹ {el.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    ₹ {el.price * el.quantity}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
          <hr />
          <TableBody>
            <StyledTableCell component="th" scope="row">
              <h3> Grand Total</h3>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">
              <h3 className={style.grand_total_h4}>₹ {grandTotal}</h3>
            </StyledTableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default TotalTable;
