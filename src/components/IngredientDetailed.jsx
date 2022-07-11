import * as React from "react"
import 'font-awesome/css/font-awesome.min.css'
import { Transition } from "react-transition-group"

function IngredientDetailed({ ingredient, isInPantry, toggleIngredientInPantry}) {

  const duration = 4000

  const generalStylesWrap = {
    transition: `all ${duration}ms ease-out`,
  }

  const transitionStylesWrap = {
    entering: {
      backgroundColor: `#cfe9fe`
    },
    entered: {
      backgroundColor: `#cfe9fe`
    },
    exiting: {
      backgroundColor: `#fcc`
    },
    exited: {
      backgroundColor: `#fcc`
    }
  }

  return (
    <Transition in={isInPantry} timeout={duration}>
      {state => (
        <div className={"cb-ingredient"} style={{...generalStylesWrap, ...transitionStylesWrap[state]}}
        >
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
            <div className={"cb-mb-8"}>
              {
                isInPantry ?
                  <span className={"cb-copy cb-copy--green"}>
                  <i className={"fa fa-check"} />
                  <input
                    type={"button"}
                    value={"Segna come termianto"}
                    onClick={() => toggleIngredientInPantry(ingredient.ingredient)}
                  />
                </span> :
                  <span>
                  <a href={"https://www.google.com/search?q="+ingredient.ingredient} target={"_blank"}>Buy it here</a>
                  <input
                    type={"button"}
                    value={"Segna come comprato"}
                    onClick={() => toggleIngredientInPantry(ingredient.ingredient)}
                  />
                </span>
              }
            </div>
          </div>
        </div>
      )}
    </Transition>)
}

export default IngredientDetailed
