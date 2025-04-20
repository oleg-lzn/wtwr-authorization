import { useState, createContext, useContext } from "react";

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const LoggedInWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export const useLoggedIn = () => useContext(LoggedInContext);
