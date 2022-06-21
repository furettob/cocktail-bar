import React, {useState, useEffect} from "react";
import {getFavourites, setFavourites, toggleFavourite} from "../utils/utils"

export const PantryContext = React.createContext([]);

export const PantryProvider = ({ value, children }) => {

  const [pantryList, setFavouriteList] = useState(value?.pantryList || [])
  // Upon loading - get an initial value for favourites
  useEffect( async () => {
    console.log("Using PantryProvider effect")
  },[])

  const toggleIngredientInPantry = (id) => {
    console.log("Toggling ", id)
    /*toggleFavourite(id)
    let fav = getFavourites()
    setFavouriteList(fav)*/
  }

  return (
    <PantryContext.Provider value={ {pantryList, toggleIngredientInPantry} }>{children}</PantryContext.Provider>
  );
};
