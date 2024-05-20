import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState("");
  const fetchUser = () => {
    const userFromStorage = window.localStorage.getItem("user");
    setUser(userFromStorage);
  };
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    fetchUser();
  };
  const logInUser = () => {
    navigate("/login");
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <p>user: {user}</p>
          <Button onClick={() => logOutUser()}>Logout</Button>
        </div>
      ) : (
        <Button onClick={() => logInUser()}>Login</Button>
      )}
    </div>
  );
};

export default Home;
