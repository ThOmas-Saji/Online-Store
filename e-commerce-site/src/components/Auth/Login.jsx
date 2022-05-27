import style from "./style.module.css";
import {
  CircularProgress,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { get_user } from "../../redux/auth/auth_action";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [missingField, setMissingField] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleChanges(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmitData() {
    if (!userData.email || !userData.password) {
      setMissingField(true);
      return;
    } else {
      setLoading(true);
      setMissingField(false);
      setTimeout(() => {
        setLoading(false);
        dispatch(get_user(userData));
        navigate("/");
      }, 2500);
    }
  }

  return (
    <Box className={style.container}>
      <Typography gutterBottom variant="h5">
        {" "}
        Login{" "}
      </Typography>
      <Card sx={{ width: "20%", margin: "auto", padding: "1rem" }}>
        <Stack spacing={2}>
          <TextField
            onChange={(e) => handleChanges(e)}
            type="email"
            name="email"
            size="small"
            label="E-mail"
          />
          <TextField
            onChange={(e) => handleChanges(e)}
            type="password"
            name="password"
            size="small"
            label="Password"
          />
          {missingField ? (
            <p style={{ color: "red" }}>Please fill all the Fields</p>
          ) : (
            ""
          )}
          {loading ? (
            <Box sx={{ width: "100%", margin: "auto", color: "teal" }}>
              <CircularProgress></CircularProgress>
            </Box>
          ) : (
            <Button
              onClick={handleSubmitData}
              color="secondary"
              variant="contained"
            >
              Login
            </Button>
          )}
        </Stack>
      </Card>
      <p>
        If you don't have an account ?<Link to="/register"> Register </Link>
      </p>
    </Box>
  );
}

export default Login;
