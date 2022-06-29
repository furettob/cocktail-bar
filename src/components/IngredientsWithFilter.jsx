import * as React from "react"
import {PantryContext} from "../context/PantryContext"
import Tag from "./Tag"
import withFilter from "../hocs/withFilter"
import { useState } from "react"

function Ingredients(props) {

  console.log("Render Ingredients with props: ", props)
  const { initialSet, set, handleQueryChange, query, startsWith} = props
  const isInPantry = (name, pantryList) => pantryList.indexOf(name) > -1

  return (
    <div>
      <div>
        <div className={"cb-mb-16"}>
          <input value={query} onChange={e => handleQueryChange(e)} name={"query"}/>
          <input type={"checkbox"} name="startsWith" value={startsWith} onChange={e => handleQueryChange(e)}/><span>Only Starts With</span>
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

export default withFilter(Ingredients, "", (ingredient, formState) => {
  console.log(formState)
  return ingredient.strIngredient1.indexOf(formState.query) > -1
} )
