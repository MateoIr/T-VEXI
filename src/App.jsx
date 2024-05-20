import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import StoreProvider from "./store/StoreProvider";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setUser(token);
  }, []);
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
