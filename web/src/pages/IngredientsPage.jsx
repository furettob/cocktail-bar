import * as React from "react"
import Row from "../components/Row"
import Tag from "../components/Tag"
import { useEffect, useState } from "react"
import { PantryContext } from "../context/PantryContext"
import { getAllIngredients } from "../utils/dataHub"

function IngredientsPage() {
  const [ingredients, setIngredients] = useState([])

  useEffect(async () => {
    const ing = await getAllIngredients()
    setIngredients(ing)
  }, [])

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && (
        <Row>
          <PantryContext.Consumer >
            {
              ({toggleIngredientInPantry, isInPantry}) =>
              {return ingredients.map(ing => (
                <Tag name={ing?.strIngredient1} big
                     clickCallback={() => {
                       toggleIngredientInPantry(ing.strIngredient1)
                     }}
                     selected={isInPantry(ing.strIngredient1)}
                     type={{ className: isInPantry(ing.strIngredient1) ? "success" : "" }}
                />
              ))}
            }
          </PantryContext.Consumer>
        </Row>
      )}
    </div>
  )
}

export default IngredientsPage
