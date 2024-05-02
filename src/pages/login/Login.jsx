import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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

const Login = () => {
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

  const onSubmit = (data) => {
    window.location.href = "/";
    // ver si es posible con rrd
  };
  return (
    <>
      <Box className="buttomGradient"></Box>
      <Box className="dysplayContainer">
        <Grid container className="container" sx={{ width: 400 }}>
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
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
              className="logIn" // Clase CSS personalizada
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Log In
            </Button>

            <Button
              sx={{ textTransform: "none", width: "100%" }}
              variant="outlined"
              startIcon={<img src={google} alt="" style={{ width: "20px" }} />}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;