import React, {useState, useEffect, useContext} from "react";
import {getFavourites, setFavourites, toggleFavourite} from "../utils/utils"
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext"

export const FavouriteContext = React.createContext([]);

export const FavouriteProvider = ({ value, children }) => {
  let history = useHistory();
  const { user } = useContext(AuthContext)

  const [favouriteList, setFavouriteList] = useState(value?.favouriteList || [])
  // Upon loading - get an initial value for favourites
  useEffect( async () => {
    console.log("Using FavouriteProvider effect")
    let fav = getFavourites()
    //console.log("FAV IS: ", fav)
    setFavouriteList(fav)
    setFavourites(fav)
    console.log("Provider with value: ", fav)
  },[])

  const toggleFavouriteFunction = (id) => {
    if (user) {
      toggleFavourite(id)
      let fav = getFavourites()
      setFavouriteList(fav)
    } else {
      history.push({
        pathname: '/login', // location state
        state: {
          testo: "Devi essere loggato per poter aggiungere ai preferiti il prossimo drink ;)",
          redirectTo: id ? "/drink/"+id : null
      }
    })
    }
  }

  return (
    <FavouriteContext.Provider value={ {favouriteList, toggleFavouriteFunction} }>{children}</FavouriteContext.Provider>
  );
};
