import React, { useEffect, useState } from "react";

const initialLang = "en"

export const LanguageContext = React.createContext({pantry:initialLang});

export const LanguageProvider = ({ value, children }) => {
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
