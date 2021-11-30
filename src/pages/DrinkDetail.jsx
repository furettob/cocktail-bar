import * as React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Row from "../components/Row"
import { getDrinkById } from "../utils/dataHub"
import DrinkCard from "../components/DrinkCard"

function DrinkDetail(props) {
  const { id } = useParams()

  const [drink, setDrink] = useState(props?.drink)

  useEffect(async () => {
    if (!drink) {
      const drink = await getDrinkById(id)
      console.log("FOUND DRINK BY ID: ", drink)
      setDrink(drink)
    }
  }, [])

  return (
    <div>
      <h1>
        Details for drink {id} {drink && ` - ${drink.strDrink}`}
      </h1>
      <Row>{drink ? <DrinkCard drink={drink} isDetail /> : "Loading..."}</Row>
    </div>
  )
}

export default DrinkDetail
