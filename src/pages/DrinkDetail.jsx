import * as React from 'react'
import Row from '../components/Row'
import {useEffect, useState} from "react"
import {getCocktails, getRandomCocktail} from '../utils/dataHub'

function DrinkDetail({drink, match}) {
    const { id } = match.params.filter
    const [filters, setFilters] = useState({})

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
        <h1>{id}</h1>
          <Row>
              ddddd
          </Row>
      </div>
    )
  }

  export default DrinkDetail