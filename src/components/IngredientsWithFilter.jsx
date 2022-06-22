import * as React from "react"
import {PantryContext} from "../context/PantryContext"
import Tag from "./Tag"
import withFilter from "../hocs/withFilter"

function Ingredients({ initialSet, set, handleQueryChange, query}) {
  const isInPantry = (name, pantryList) => pantryList.indexOf(name) > -1

  return (
    <div>
      <div>
        <div className={"cb-mb-16"}><input value={query} onChange={e => handleQueryChange(e)}/></div>
        <PantryContext.Consumer>
          {
            ({pantryList, toggleIngredientInPantry}) =>

            {return set.map(ing => (
              <Tag name={ing?.strIngredient1} big
                   clickCallback={() => {
                     toggleIngredientInPantry(ing.strIngredient1)
                   }}
                   selected={isInPantry(ing.strIngredient1, pantryList)}
                   type={{ className: isInPantry(ing.strIngredient1, pantryList) ? "success" : "" }}
              />
            ))}
          }
        </PantryContext.Consumer>
        <div>Ingredients: {set.length}/{initialSet.length}</div>
      </div>
    </div>
  )
}

export default withFilter(Ingredients, "", null )
