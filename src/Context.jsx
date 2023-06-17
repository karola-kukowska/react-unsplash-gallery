import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newTheme);
    //console.log(body);
  };

  return (
    <GlobalContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
