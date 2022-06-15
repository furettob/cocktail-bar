import React, { useEffect, useState } from "react"
import {getFavourites, setFavourites, toggleFavourite} from "../utils/utils"

export const FavouriteContext = React.createContext({favouriteList:[], state:"missing"});

export const FavouriteProvider = ({ value, children }) => {
  const [favouriteList, setFavouriteList] = useState(value)

  // Upon loading - get an initial value for favourites
  useEffect( async () => {
    console.log("Using FavouriteProvider effect")
    let fav = getFavourites()
    console.log("FAV IS: ", fav)
    setFavouriteList(fav)
    setFavourites(fav)
    console.log("Provider with value: ", fav)
  },[])

  const toggleFavouriteFunction = (id) => {
    toggleFavourite(id)
    let fav = getFavourites()
    setFavouriteList(fav)
  }

  return (
    <FavouriteContext.Provider value={{favouriteList, toggleFavouriteFunction}}>{children}</FavouriteContext.Provider>
  )
}
