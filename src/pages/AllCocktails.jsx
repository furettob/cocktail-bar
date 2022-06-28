import * as React from "react"
import Row from "../components/Row"
import DrinkCard from "../components/DrinkCard"
import Searchbar from "../components/Searchbar"
import Counter  from "../components/Counter"
import { useEffect, useState } from "react"

import { getCocktails, getRandomCocktail } from "../utils/dataHub"
import {useParams} from "react-router-dom";

function AllCocktails() {
  const { query } = useParams()

  const [drinks, setDrinks] = useState(null)
  const [randomDrink, setRandomDrink] = useState(null)
  const [queryString, setQueryString] = useState("")

  useEffect(async () => {
    const randomDrink = await getRandomCocktail()
    console.log("RANDOM DRINK: ", randomDrink)
    setRandomDrink(randomDrink)

    if (query && query !== '') {
      await searchDrink(query);
    }
  }, [])

  const searchDrink = async searchStr => {
    setQueryString(searchStr)
    const drinks = await getCocktails(searchStr)
    console.log("DRINKS FROM QUERY: ", drinks)
    setDrinks(drinks)
  }

  const cbSearchCallback = async searchStr => {
    await searchDrink(searchStr);
  }

  const [counter, setCounter] = useState(0)

  return (
    <div>
      <h1>Search for an amazing cocktail</h1>
      <Row>
        <Searchbar cta={"Go!"} onClickCallback={cbSearchCallback} />
      </Row>
      <Row intro={"Examples"}>
          <Counter counter={counter} setCounterCallback={setCounter}/>
      </Row>
      {drinks && (
        <Row intro={"Cocktails you asked for:"}>
          {/* ESE-4 */}
          {drinks.map(drink => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
          {drinks.length === 0 && (
            <div>
              <p className={"cb-copy"}>No cocktail found for the query "{queryString}".</p>
              <p className={"cb-copy"}>Try a new research.</p>
            </div>
          )}
        </Row>
      )}
      {!drinks && randomDrink && (
        <Row intro={"Cocktail of the hour:"}>
          {randomDrink.map(drink => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </Row>
      )}
      {!drinks && !randomDrink && <Row>Loading...</Row>}
    </div>
  )
}

export default AllCocktails
