import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();
export const AppProvider = ({ children }) => {
  const url = `https://api.unsplash.com/search/photos/?client_id=${
    import.meta.env.VITE_API_KEY
  }&page=1`;
  const getThemePrefference = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-schema:dark)"
    ).matches;
    const storedDarkMode = localStorage.getItem("darkTheme") === "true";
    return storedDarkMode || prefersDark;
  };
  const [isDarkTheme, setIsDarkTheme] = useState(getThemePrefference());
  const [searchTerm, setSearchTerm] = useState("dog");
  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("darkTheme", newTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <GlobalContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, url, searchTerm, setSearchTerm }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
