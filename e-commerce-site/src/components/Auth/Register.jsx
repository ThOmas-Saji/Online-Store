import style from "./style.module.css";
import {
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post_user } from "../../redux/auth/auth_action";

function Register() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [missingField, setMissingField] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { users } = useSelector((store)=>store.users);
  function handleChanges(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmitData() {
    if (!userData.full_name || !userData.email || !userData.password) {
      setMissingField(true);
      return;
    } else {
      setLoading(true);
      setMissingField(false);
      setTimeout(() => {
        setLoading(false);
        dispatch(post_user(userData));
        navigate("/login");
      }, 2500);
    }
  }

  return (
    <Box className={style.container}>
      <Typography gutterBottom variant="h5">
        {" "}
        Register{" "}
      </Typography>
      <Card sx={{ width: "20%", margin: "auto", padding: "1rem" }}>
        <Stack spacing={2}>
          <TextField
            onChange={(e) => handleChanges(e)}
            type="text"
            name="full_name"
            size="small"
            label="Full name"
          />
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
          {loading ? ( <Box  sx={{  width:"100%", 
          margin: "auto",
           color: "teal" }}>
          <CircularProgress
              sx={{ color: "teal" }}
            ></CircularProgress>
          </Box>
           
          ) : (
            <Button
              onClick={handleSubmitData}
              color="secondary"
              variant="contained"
            >
              Register
            </Button>
          )}
        </Stack>
      </Card>
      <p>
        If you already have an account ?<Link to="/login"> Login </Link>
      </p>
    </Box>
  );
}

export default Register;
