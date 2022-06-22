import * as React from "react"
import Row from "../components/Row"
import IngredientsWithFilter from "../components/IngredientsWithFilter"
import { useEffect, useState } from "react"
import { getAllIngredients } from "../utils/dataHub"

function IngredientsPageWithFilter() {
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    const ing = await getAllIngredients()
    setIngredients(ing)
  }, [])

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && ingredients.length && (
        <Row>
            <IngredientsWithFilter
              initialSet={ingredients}
              filterFunction={ (ing, searchString) => ing.strIngredient1.indexOf(searchString)  -1}
            />
        </Row>
      )}
    </div>
  )
}

export default IngredientsPageWithFilter
