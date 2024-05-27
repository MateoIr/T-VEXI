import PropTypes from "prop-types";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import google from "/src/imgs/gmail.png";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, user } = useLogin({ email, password, setUser });

  const schema = yup.object().shape({
    email: yup.string().email("it must be a e-mail").required("insert value"),
    password: yup
      .string()
      .min(4, "It must have 4 characters")
      .max(20, "It must be less than 20 characters")
      .required("insert value"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = ({ email, password }) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <>
      <Box className="buttomGradient"></Box>
      <Box className="dysplayContainer">
        <Grid
          container
          className="container"
          sx={{
            maxWidth: 500,
            paddingX: { xs: "20px", sm: "50px" },
            paddingY: "30px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ textAlign: "center", width: "100%", fontWeight: 600 }}
          >
            Welcome back!
          </Typography>
          <Grid item xs={12}>
            <Typography className="textInput">Email</Typography>
            <TextField
              {...register("email")}
              sx={{ width: "100%" }}
              id="mail"
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <p className="errorText">{errors.email?.message}</p>
            <Typography className="textInput">Password</Typography>
            <TextField
              id="password"
              type="password"
              {...register("password")}
              sx={{ width: "100%" }}
              placeholder="Enter password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="start">
                    <a href="#" className="linkStyle">
                      Forgot Password?
                    </a>
                  </InputAdornment>
                ),
              }}
            />
            <p className="errorText">{errors.password?.message}</p>

            <Button
              className="logIn"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              {isLoading ? "Loading..." : "Log In"}
            </Button>
            {user && <p className="errorText">user or password incorrect!</p>}
            <Button
              sx={{
                textTransform: "none",
                width: "100%",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
              variant="outlined"
              startIcon={<img src={google} alt="" style={{ width: "20px" }} />}
            >
              Sign in with Google
            </Button>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography
                variant="span"
                sx={{ textDecoration: "none" }}
                className="textLink"
              >
                have an account?
              </Typography>
              <Typography
                variant="span"
                sx={{ textDecoration: "underline", paddingLeft: "5px" }}
                className="textLink"
              >
                Register
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
