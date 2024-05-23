import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.css";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useRegister";
import { useState } from "react";

const Register = ({ setUser }) => {
  const schema = yup.object().shape({
    email: yup.string().email("it must be a e-mail").required("insert value"),
    password: yup
      .string()
      .min(4, "It must have 4 characters")
      .max(20, "It must be less than 20 characters")
      .required("insert value"),
    ConfirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "The password must be the same"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [userExist, setUserExist] = useState(null);
  const { mutate: registerUser } = useRegister();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;
    const token = Math.floor(100000 + Math.random() * 900000);
    const user = { email, password, token };
    registerUser(user, {
      onSuccess: (data) => {
        if (data?.error) {
          setUserExist(data.error);
        } else {
          window.localStorage.setItem("token", token);
          setUser(token);
          navigate("/home");
        }
      },
      onError: (error) => {
        console.error("Error registering user:", error);
      },
    });
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
            Get a count!
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
              }}
            />
            <p className="errorText">{errors.password?.message}</p>
            <Typography className="textInput">Confirm Password</Typography>
            <TextField
              {...register("ConfirmPassword")}
              sx={{ width: "100%" }}
              id="ConfirmPassword"
              type="password"
              placeholder="Confirm Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <p className="errorText">{errors.ConfirmPassword?.message}</p>
            <Button
              className="logIn"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Register
              {/* {isLoading ? "Loading..." : "Register"} */}
            </Button>
            {userExist && (
              <p className="errorText">You already have a count!</p>
            )}
            <Link to="/login" style={{ textDecoration: "none" }}>
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
                Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
