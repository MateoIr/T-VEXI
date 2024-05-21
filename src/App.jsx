import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import StoreProvider from "./store/StoreProvider";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useLocalStorage } from "react-use";

function App() {
  const [user, setUser] = useLocalStorage("token");

  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            element={
              <ProtectedRoute canActivate={user} redirectPath="/login" />
            }
          >
            <Route path="/home" element={<Home />} />
          </Route>
          <Route
            element={
              <ProtectedRoute canActivate={!user} redirectPath="/home" />
            }
          >
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
