import React, {useState, useEffect, useContext} from "react";
import {setFavourites} from "../utils/utils"
import { toggleFavouriteDrink } from "../utils/api"
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext"

export const FavouriteContext = React.createContext([]);

export const FavouriteProvider = ({ value, children }) => {
  let history = useHistory();
  const { user } = useContext(AuthContext)

  const [favouriteList, setFavouriteList] = useState(value?.favouriteList || {})
  // Upon loading - get an initial value for favourites
  useEffect( async () => {
    console.log("Using FavouriteProvider effect: ", user)
    let fav = user?.customData?.favouriteList || {} //getFavourites()
    setFavouriteList(fav)
    setFavourites(fav)
    console.log("Provider with value: ", fav)
  },[user])

  const isFavourite = (drinkId, drinkName, favList) => {
   return Object.keys(favList).indexOf(drinkId) > -1 || Object.keys(favList).findIndex( (id, index) => {
     return favList[id]?.name?.toUpperCase() === drinkName.toUpperCase()
    }) > -1
  }

  const toggleFavouriteFunction = async (id,name) => {
    if (user) {
      const fav = await toggleFavouriteDrink(user, {drinkId:id, drinkName:name||"", uid:user.uid})
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
    <FavouriteContext.Provider value={ {favouriteList, toggleFavouriteFunction, isFavourite} }>{children}</FavouriteContext.Provider>
  );
};
