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
    // console.log("ING::::: ", ing)
    setIngredients(ing)
  }, [])

  const onIngredientClicked = (ingName) => {
    console.log("You clicked on: ", ingName)

  }

  const isInPantry = (name, value) => value.pantryList.indexOf(name) > -1

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && (
        <Row>
          {/* ESE-4 */}
          {ingredients.map(ing => (
            <PantryContext.Consumer key={ing?.strIngredient1}>
              {
                (value) => <Tag name={ing?.strIngredient1} big
                                clickCallback={() => onIngredientClicked(ing?.strIngredient1)}
                                selected={isInPantry(ing.strIngredient1, value)}
                                type={ {className: isInPantry(ing.strIngredient1, value) ? "success" : ""}}
                />
              }
            </PantryContext.Consumer>
          ))}
        </Row>
      )}
    </div>
  )
}

export default IngredientsPage
