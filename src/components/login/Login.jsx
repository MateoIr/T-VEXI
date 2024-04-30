import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
  return (
    <>
      <Box className="buttomGradient"></Box>
      <Box className="dysplayContainer">
        <Grid container className="container">
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
            Welcome back!
          </Typography>
          <Grid item xs={12}>
            <Typography className="textInput">Email</Typography>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-error"
              placeholder="Enter your email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Typography className="textInput">Password</Typography>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-error"
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
            <button className="logIn">Log In</button>
            <img src="" alt="" />
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
