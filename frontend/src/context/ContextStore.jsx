import { createContext, useEffect, useState } from "react";

export const Authcontext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsLogin(true);
    } else {
      setToken(null);
      setIsLogin(false);
    }
  }, []); 

  return (
    <Authcontext.Provider value={{ token, isLogin, setIsLogin, setToken }}>
      {children}
    </Authcontext.Provider>
  );
};
