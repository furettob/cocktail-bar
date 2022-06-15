import React from "react";

const initialLang = "en"

export const FavouriteContext = React.createContext([]);

export const FavouriteProvider = ({ value, children }) => {
  return (
    <FavouriteContext.Provider value={value}>{children}</FavouriteContext.Provider>
  );
};
