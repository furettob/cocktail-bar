import React from "react";

const initialLang = "sono il default value"

export const LanguageContext = React.createContext({lang:initialLang});

export const LanguageProvider = ({ value, children }) => {
  value = value || initialLang
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
