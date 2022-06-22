import * as React from "react"
import Row from "../components/Row"
import IngredientsWithFilter from "../components/IngredientsWithFilter"
import { useEffect, useState } from "react"
import { getAllIngredients } from "../utils/dataHub"

function IngredientsPageWithFilter() {
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    const ing = await getAllIngredients()
    console.log("Using effect::: ", ing)
    setIngredients(ing)
  }, [])

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && ingredients.length > 0 && (
        <Row>
            <IngredientsWithFilter
              initialSet={ingredients}
              filterFunction={ (ing, searchString) => ing.strIngredient1.indexOf(searchString)  -1}
            />
          {/*<div>Ingredients: {ingredients.length}</div>*/}
        </Row>
      )}
    </div>
  )
}

export default IngredientsPageWithFilter
