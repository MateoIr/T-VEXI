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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/users";
import { useState } from "react";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getUserSelected2 = async () => {
    const response = await fetch(
      `http://localhost:8000/users?email=${email}&password=${password}`
    );
    return response.json();
  };

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUserSelected2(),
  });

  const onSubmit = (data) => {
    setEmail(data.email);
    setPassword(data.password);
    console.log("datos ingresados:", data.email, data.password);
    console.log("respuesta del fetch:", usersQuery.data);
  };

  return (
    <>
      {usersQuery.status === "success" && (
        <div>
          <h1>Posts List 1</h1>
          <ol>
            {usersQuery.data.map((user) => (
              <li key={user.id}>{user.email}</li>
            ))}
          </ol>
        </div>
      )}
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
              className="logIn"
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
