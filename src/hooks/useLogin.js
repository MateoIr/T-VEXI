import { useQuery } from "@tanstack/react-query";
import { getUserSelected } from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = ({ email, password, setUser }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", email, password],
    queryFn: () => getUserSelected(email, password),
    enabled: !!email && !!password,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.length > 0) {
      const { email: emailSelected, password: passwordSelected } = user[0];
      console.log("User data:", user[0]);
      if (emailSelected === email && passwordSelected === password) {
        window.localStorage.setItem("user", email);
        setUser(user[0].token);
        navigate("/home");
      }
    }
  }, [user, email, password, navigate, setUser]);

  return {
    user,
    isLoading,
    error,
  };
};

export default useLogin;
