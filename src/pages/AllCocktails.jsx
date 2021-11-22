import * as React from 'react'
import Row from '../components/Row';
import DrinkCard from '../components/DrinkCard';
import Searchbar from '../components/Searchbar';
import {useEffect, useState} from "react";

import {getCocktails, getRandomCocktail} from '../utils/dataHub'

function AllCocktails({myEvents, key}) {

    const [drinks, setDrinks] = useState(null)
    const [randomDrink, setRandomDrink] = useState(null)

    useEffect( async () => {
        console.log("RANDOM DRINK AAAAAA: ")
        const randomDrink = await getRandomCocktail()
        console.log("RANDOM DRINK: ", randomDrink)
        setRandomDrink(randomDrink)
    }, []
    )

    const cbSearchCallback = async searchStr => {
        const drinks = await getCocktails(searchStr)
        console.log("DRINKS: ", drinks)
        setDrinks(drinks)
    }

    return (
      <div>
        <h1>Search for an amazing cocktail</h1>
          <Row>
              <Searchbar cta={"Go!"} onClickCallback={cbSearchCallback}/>
          </Row>
          {drinks && (
              <Row intro={"Cocktails you asked for:"}>
                  {/* ESE-4 */}
                  {drinks.map( drink => <DrinkCard key={drink.idDrink} drink={drink}/>)}
                  {drinks.length === 0 && (
                      <div>
                          <p className={"cb-copy"}>No cocktail found for your query.</p>
                          <p className={"cb-copy"}>Try a new research.</p>
                      </div>
                  )}
              </Row>
          )}
          {!drinks && randomDrink && (
              <Row intro={"Cocktail of the hour:"}>
                  {randomDrink.map( drink => <DrinkCard key={drink.idDrink} drink={drink}/>)}
              </Row>
          )}
          {!drinks && !randomDrink && (
              <Row>
                  Loading...
              </Row>
          )}
      </div>
    )
  }

  export default AllCocktails