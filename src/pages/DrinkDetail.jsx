import * as React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Row from "../components/Row"
import { getDrinkById } from "../utils/dataHub"
import DrinkCard from "../components/DrinkCard"

function DrinkDetail(props) {
  const { id } = useParams()

  const [drink, setDrink] = useState(props?.drink)
  const [error, setError] = useState(null)

  useEffect(async () => {
    console.log("Searching ...")
    if (!drink) {
      const data = await getDrinkById(id)
      console.log("FOUND DRINK BY ID: ", data)
      if (data?.idDrink) {
        setDrink(data)
      } else {
        setError(data || "Cocktail not found for id " + id)
      }
    }
  }, [])


  return (

    <div>
      {drink && (drink.idDrink ? (
        <div>
          <h1>
            Details for drink {id} {drink && ` - ${drink.strDrink}`}
          </h1>
          <Row>{drink ? <DrinkCard drink={drink} isDetail /> : "Loading..."}</Row>
        </div>
      ) : <div>Loading...</div>)
      }
      {error && (
        <div>
          <h1>
            Details for drink {id} {drink && ` - ${drink.strDrink}`}
          </h1>
          <Row>An error occurred:</Row>
          <Row>{JSON.stringify(error)}</Row>
        </div>
      )
      }
    </div>
  )
}

export default DrinkDetail
