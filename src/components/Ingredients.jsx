import * as React from "react"
import IngredientSummary from "./IngredientSummary"
import IngredientDetailed from "./IngredientDetailed"
import { Pantry } from "../context/PantryContext"

function Ingredients({ ingredients, summary }) {

  const getShoppingListDescription = (pantry, ingredients) => {
    const alreadyPurchased = pantry.reduce( (prev, curr) => {
      if (ingredients.findIndex( ingredient => ingredient.ingredient.toUpperCase() === curr.toUpperCase()) > -1 ) {
        prev.push(curr)
      }
      return prev
    }, [])

    if (alreadyPurchased.length === 0) {
      return <div>You don't have any of the ingredients yet.</div>
    }
    return <div>You already have {alreadyPurchased.length} of the ingredients ({alreadyPurchased.join(", ")}).</div>
  }
  return (
    <div className={summary ? "" : "cb-ingredient-grid"}>
      {ingredients.map((elem, index) =>
        summary ? (
          <span key={elem.ingredient+"_"+index} >
            <IngredientSummary ingredient={elem} key={elem.ingredient} />
            {index < ingredients.length - 1 ? " · " : ""}
          </span>
        ) : (
          <IngredientDetailed ingredient={elem} key={elem.ingredient+"_"+index} />
        )
      )}
      <Pantry.Consumer>
        {value => getShoppingListDescription(value, ingredients)}
      </Pantry.Consumer>
    </div>
  )
}

export default Ingredients
