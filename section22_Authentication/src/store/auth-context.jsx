import react, { useState } from "react";

const AuthContext = react.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;

let logoutTimer;

const calculateRemainingTime = (expireTime) => {
  const currentTime = new Date().getTime();
  const adjexpireTime = new Date(expireTime).getTime();
  return adjexpireTime - currentTime;
};

export const AuthContextProvider = (props) => {
  const initalToken = localStorage.getItem("token");
  const [token, setToken] = useState(initalToken);
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  const loginHandler = (token, expireTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    const remainingTime = calculateRemainingTime(expireTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const initialValue = {
    token: token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={initialValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
