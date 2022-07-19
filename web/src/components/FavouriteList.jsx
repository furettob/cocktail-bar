import * as React from "react"
import { useEffect, useState } from "react"
import { getDrinkById } from "../utils/dataHub"
import DrinkCard from "./DrinkCard"

function FavouriteList({favouriteList}) {

  const [drinkList, setDrinkList] = useState([])

  useEffect(async () => {
      let drinkArray = []
      for (let i in favouriteList) {
        const d = favouriteList.length > i ? await getDrinkById(favouriteList?.[i]) : null
        d.idDrink && drinkArray.push(d)
      }
      setDrinkList(drinkArray)
    }, [favouriteList]
  )

  return <div>
    <div>
      {
        drinkList.map( (drink) => <DrinkCard drink={drink} isDetail key={drink.strDrink}/>)
      }
    </div>
  </div>
}

export default FavouriteList
