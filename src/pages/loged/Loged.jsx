import { useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreProvider";
import { types } from "../../store/StoreReducer";
import { useNavigate } from "react-router-dom";

const Loged = () => {
  const [store, dispatch] = useContext(StoreContext);
  const { user } = store;
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: types.authLogout });
    navigate("/home");
  };

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/home");
    }
  }, [navigate]);

  if (window.localStorage.getItem("token")) {
    return (
      <div>
        User:{user?.email}
        <br></br>
        Token:{user?.token}
        <br></br>
        <button onClick={() => logOutUser()}>Logout</button>
        <br></br>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }
};

export default Loged;
