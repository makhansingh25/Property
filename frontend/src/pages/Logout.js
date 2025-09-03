import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Navigate to="/signin" />;
};

export default Logout;
