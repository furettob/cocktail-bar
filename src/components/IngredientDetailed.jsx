import * as React from "react"
import 'font-awesome/css/font-awesome.min.css'

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
        <div className={"cb-mb-8"}>
          <div className={"cb-copy cb-copy--bold"}>{ingredient.ingredient}</div>
        </div>
        <div className={"cb-mb-8 cb-copy"}>{ingredient.measure || "to taste"}</div>
        <div className={"cb-mb-8"}>{isInPantry ?
          <span className={"cb-copy cb-copy--green"}><i className={"fa fa-check"} /></span> :
          <span><a href={"https://www.google.com/search?q="+ingredient.ingredient} target={"_blank"}>Buy it here</a></span>
        }
        </div>
      </div>
    </div>
  )
}

export default IngredientDetailed
