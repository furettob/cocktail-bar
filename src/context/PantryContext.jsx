import React, { useEffect, useState } from "react";

const initialPantry = ["rum", "sugar", "light rum"]

export const Pantry = React.createContext({pantry:initialPantry});

export const PantryProvider = ({ children }) => {
  // do something to get/update pantry
  const pantry = initialPantry
  return (
    <Pantry.Provider value={pantry}>{children}</Pantry.Provider>
  );
};
