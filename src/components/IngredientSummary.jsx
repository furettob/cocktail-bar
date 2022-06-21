import * as React from "react"

function IngredientSummary({ ingredient, isInPantry }) {
  return (
    <span>
      <span>{ingredient.ingredient}</span>
      {ingredient.measure && (
        <span className={"cb-copy--muted"}>&nbsp;({ingredient.measure})</span>
      )} 
      {' '} 
      {isInPantry ? 'ce l\'ho' : 'manca'}
    </span>
  )
}

export default IngredientSummary
