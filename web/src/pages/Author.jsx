import * as React from "react"
import Row from "../components/Row"
import DrinkCard from "../components/DrinkCard"
import Searchbar from "../components/Searchbar"
import Colophon from "../components/ColophonComponents"


import { useEffect, useState } from "react"

import { getCocktails, getRandomCocktail } from "../utils/dataHub"
import {useParams} from "react-router-dom";

function Author() {
  const { query } = useParams()

  /*const [drinks, setDrinks] = useState(null)
  const [randomDrink, setRandomDrink] = useState(null)
  const [queryString, setQueryString] = useState("")*/

  /*useEffect(async () => {
    const randomDrink = await getRandomCocktail()
    console.log("RANDOM DRINK: ", randomDrink)
    setRandomDrink(randomDrink)

    if (query && query !== '') {
      await searchDrink(query);
    }
  }, [])*/

  

  return (
    <div>
      <h1>Author</h1>
        <Colophon />
    </div>
  )
}

export default Author
