import * as React from "react"
import IngredientSummary from "./IngredientSummary"
import IngredientDetailed from "./IngredientDetailed/IngredientDetailed"
import {PantryContext} from "../context/PantryContext"

function Ingredients({ ingredients, summary }) {
  const isInPantry = (name, pantryList) => pantryList.indexOf(name) > -1
  return (
    <div className={summary ? "" : "cb-ingredient-grid"}>
      <PantryContext.Consumer>
      { ({pantryList, isInPantry, toggleIngredientInPantry}) =>
          { return ingredients.map((elem, index) =>
            summary ? (
              <span key={elem.ingredient+"_"+index} >
                <IngredientSummary ingredient={elem} key={elem.ingredient} isInPantry={isInPantry(elem.ingredient, pantryList)} />
                {index < ingredients.length - 1 ? " · " : ""}
              </span>
            ) : (
              <IngredientDetailed toggleIngredientInPantry={toggleIngredientInPantry} ingredient={elem} key={elem.ingredient+"_"+index} isInPantry={isInPantry(elem.ingredient, pantryList)}  />
            )
          )}
      }
      </PantryContext.Consumer>
    </div>
  )
}

export default Ingredients
