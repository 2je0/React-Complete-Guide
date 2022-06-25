import react, { useCallback, useEffect, useState } from "react";

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

const retrieveStoredToken = () => {
  const expireTime = localStorage.getItem("expireTime");
  const storedToken = localStorage.getItem("token");
  const remainingTime = calculateRemainingTime(expireTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    return null;
  }
  return { token: storedToken, duration: remainingTime };
};

export const AuthContextProvider = (props) => {
  const retrieveToken = retrieveStoredToken();
  let initalToken;
  if (retrieveToken) {
    initalToken = retrieveToken.token;
    console.log(retrieveToken.duration);
  }
  const [token, setToken] = useState(initalToken);
  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (retrieveToken) {
      logoutTimer = setTimeout(logoutHandler, retrieveToken.duration);
    }
  }, [logoutHandler, retrieveToken]);

  const loginHandler = (token, expireTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expireTime", expireTime);
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
