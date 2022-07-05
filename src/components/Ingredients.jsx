import * as React from "react"
import IngredientSummary from "./IngredientSummary"
import IngredientDetailed from "./IngredientDetailed"
import {PantryContext} from "../context/PantryContext"

function Ingredients({ ingredients, summary }) {
  return (
    <div className={summary ? "" : "cb-ingredient-grid"}>
      <PantryContext.Consumer>
      { ({pantryList, toggleIngredientInPantry, isInPantry}) =>
          { return ingredients.map((elem, index) =>
            summary ? (
              <span key={elem.ingredient+"_"+index} >
                <IngredientSummary ingredient={elem} key={elem.ingredient} isInPantry={isInPantry(elem.ingredient, pantryList)} />
                {index < ingredients.length - 1 ? " · " : ""}
              </span>
            ) : (
              <IngredientDetailed ingredient={elem} key={elem.ingredient+"_"+index} isInPantry={isInPantry(elem.ingredient, pantryList)} toggleIngredientInPantry={toggleIngredientInPantry} />
            )
          )}
      }
      </PantryContext.Consumer>
    </div>
  )
}

export default Ingredients
