import * as React from "react"
import Row from "../components/Row"
import DrinkCard from "../components/DrinkCard"
import Searchbar from "../components/Searchbar"
import { useEffect, useState } from "react"

import { getCocktails, getDrinkById, getIngredients, getRandomCocktail } from "../utils/dataHub"
import {useParams} from "react-router-dom";
import TagStylus from "../components/TagStylus/TagStylus"
import {getDailyCocktail, setDailyCocktail} from "../utils/utils"

function AllCocktails() {
  const { query } = useParams()

  const [drinks, setDrinks] = useState(null)
  const [randomDrink, setRandomDrink] = useState(null)
  const [queryString, setQueryString] = useState("")

  const getRandomCocktailOrCache = async () => {
    const cached = getDailyCocktail()
    if (cached?.cocktailObj && cached?.date && Date.now() - cached.date < 86400000) {
      // console.log("Returning cached cocktail::: ", cached.cocktailObj.strDrink)
      // 86400000 = 24 hours
        return cached.cocktailObj
    }
    const newDailyCocktail = await getRandomCocktail()
    // console.log("Setting new::: ", newDailyCocktail)
    setDailyCocktail({cocktailObj:newDailyCocktail, date:Date.now()})
    return newDailyCocktail
  }

  useEffect(async () => {
    const randomDrink = await getRandomCocktailOrCache()
    setRandomDrink(randomDrink)
    if (query && query !== '') {
      await searchDrink(query);
    }
  }, [])

  const searchDrink = async searchStr => {
    setQueryString(searchStr)
    const drinks = await getCocktails(searchStr)
    //console.log("DRINKS FROM QUERY: ", drinks)

    for (var i in drinks) {
      const od = drinks[i]

      const nd = {}
      // id decided by firebase
      nd["isAlcoholic"] = od["strAlcoholic"] === "Alcoholic"
      nd["category"] = od.strCategory
      nd["tags"] = od.strTags ? od.strTags.split(",") : null
      nd["creativeCommonsConfirmed"] = od.strCreativeCommonsConfirmed
      nd["name"] = od.strDrink
      nd["alternateName"] = od.strDrinkAlternate
      nd["thumbUrl"] = od.strDrinkThumb
      nd["glass"] = od.strGlass
      nd["isIBA"] = od.strIBA
      nd["imageAttribution"] = od.strImageAttribution
      nd["thumbSourceUrl"] = od.strImageSource
      nd["instructionsEN"] = od.strInstructions
      nd["instructionsDE"] = od.strInstructionsDE
      nd["instructionsES"] = od.strInstructionsES
      nd["instructionsFR"] = od.strInstructionsFR
      nd["instructionsIT"] = od.strInstructionsIT

      // create ingredients
      nd["ingredients"] = getIngredients(od)

      console.log("ND::: ", nd)

      if (od.strImageSource) {
        console.log(`${od.strImageSource} has strImageSource:: `, od.strImageSource)
      }

    }


    setDrinks(drinks)
  }

  const cbSearchCallback = async searchStr => {
    await searchDrink(searchStr);
  }

  return (
    <div>
      <h1>Search for an amazing cocktail</h1>
      <Row>
        <Searchbar cta={"Go!"} onClickCallback={cbSearchCallback} />
      </Row>
      <Row>
        <TagStylus name={"test stylus"}/>
        <TagStylus name={"test big"} big/>
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
