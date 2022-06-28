import * as React from "react"
import {PantryContext} from "../context/PantryContext"
import Tag from "./Tag"
import withFilter from "../hocs/withFilter"
import { useState } from "react"

function Ingredients({ initialSet, set, handleQueryChange, query}) {
  const isInPantry = (name, pantryList) => pantryList.indexOf(name) > -1

  const [startsWith, setStartWith] = useState(false)

  const handleStartsWithChanged = (e) => {
    console.log(`Changing from ${startsWith} to ${!startsWith} ...  `, e)
    setStartWith(!startsWith)
  }

  return (
    <div>
      <div>
        <div className={"cb-mb-16"}>
          <input value={query} onChange={e => handleQueryChange(e)}/>
          <input type={"checkbox"} checked={startsWith} onChange={e => handleStartsWithChanged(e)}/><span> Only Starts With</span>
        </div>
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

export default withFilter(Ingredients, "", (ingredient, query) => ingredient.strIngredient1.indexOf(query) > -1 )
