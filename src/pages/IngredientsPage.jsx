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

  const isInPantry = (name, pantryList) => pantryList.indexOf(name) > -1

  return (
    <div>
      <h1>All Ingredients:</h1>
      {ingredients && (
        <Row>
          <PantryContext.Consumer >
            {
              ({pantryList, toggleIngredientInPantry}) =>
              {return ingredients.map(ing => (
                <Tag name={ing?.strIngredient1} big
                     clickCallback={() => {
                       console.log("Tag is toggling: ", ing.strIngredient1)
                       toggleIngredientInPantry(ing.strIngredient1)
                     }}
                     selected={isInPantry(ing.strIngredient1, pantryList)}
                     type={{ className: isInPantry(ing.strIngredient1, pantryList) ? "success" : "" }}
                />
              ))}
            }
          </PantryContext.Consumer>
          ))}
        </Row>
      )}
    </div>
  )
}

export default IngredientsPage
