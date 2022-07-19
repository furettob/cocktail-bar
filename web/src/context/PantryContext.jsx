import React, {useState, useEffect} from "react";
import { toggleIngredientInPantry as utilsToggleIngredientInPantry} from "../utils/utils"

export const PantryContext = React.createContext([]);

export const PantryProvider = ({ value, children }) => {

  const [pantryList, setPantryList] = useState(value?.pantryList || [])
  // Upon loading - get an initial value for favourites
  useEffect( async () => {
    console.log("Using PantryProvider effect")
  },[])

  const toggleIngredientInPantry = (name) => {
    console.log("Toggling ", name)
    setPantryList(utilsToggleIngredientInPantry(name))
  }

  const isInPantry = (name) => pantryList.indexOf(name) > -1

  return (
    <PantryContext.Provider value={ {pantryList, toggleIngredientInPantry, isInPantry} }>{children}</PantryContext.Provider>
  );
};
