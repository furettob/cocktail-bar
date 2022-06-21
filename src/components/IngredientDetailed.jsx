import * as React from "react"

function IngredientDetailed({ ingredient, isInPantry}) {
  return (
    <div className={"cb-ingredient"}>
      <div className={"cb-ingredient__image-container"}>
        <img
          className={"cb-ingredient__image"}
          src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
            ingredient.ingredient
          )}.png`}
        />
      </div>
      <div>
        <div className={"cb-mb-16"}>
          <div className={"cb-copy cb-copy--bold"}>{ingredient.ingredient}</div>
        </div>
        <div className={"cb-copy"}>{ingredient.measure || "---"}</div>
        <div>{isInPantry ? 'ce l\'ho' : 'manca'} </div>
      </div>
    </div>
  )
}

export default IngredientDetailed
