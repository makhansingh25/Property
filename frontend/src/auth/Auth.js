import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [messages, setMessage] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState("");
  const AuthorizationToken = `Bearer ${token}`;

  const storeToken = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let islogedIn = !!token;

  const logoutUser = () => {
    setToken("");
    setUsers("");
    return localStorage.removeItem("token");
  };

  const authorizeUser = async () => {
    try {
      const URL = process.env.REACT_APP_BACKEND_URL;
      const currentToken = localStorage.getItem("token");
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.user);
      }
    } catch (error) {
      console.log("this is frontend error", error);
    }
  };

  useEffect(() => {
    authorizeUser();
  }, [AuthorizationToken]);

  return (
    <AuthContext.Provider
      value={{
        users,
        storeToken,
        AuthorizationToken,
        islogedIn,
        messages,
        setMessage,
        logoutUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  return authContextValue;
};
