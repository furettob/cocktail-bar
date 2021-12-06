import * as React from "react"
import { Fragment, useState } from "react"
import Ingredients from "./Ingredients"
import Tag from "./Tag"
import TagClass from "./TagClass"
import DrinkHeader from "./DrinkHeader"
import "font-awesome/css/font-awesome.min.css"
import { getIngredients } from "../utils/dataHub"

function DrinkCard({ drink, isDetail }) {
  const isAlcoholic = drink.strAlcoholic.toLowerCase() === "alcoholic"
  const [favourite, setFavourite] = useState(false)
  const [infoShown, setInfoShown] = useState(isDetail)

  const cb_favourite_clicked = () => {
    setFavourite(!favourite)
  }

  const cb_info_clicked = () => {
    setInfoShown(!infoShown)
  }

  const ingredients = getIngredients(drink)

  return (
    <div className={"cb-drink-card"}>
      {/* Header */}
      <DrinkHeader drink={drink} favourite={favourite} cb_favourite_clicked={cb_favourite_clicked}/>

      {/* Text info */}
      <div className="cb-drink-card__text-container">
        <h2 className={"cb-drink-card__title"}>{drink.strDrink}</h2>
        {/* ESE-1 "Challenging" "Simple" a seconda del numero di ingredienti */}
        <p className="cb-copy--muted cb-copy--bold">
          {ingredients.length >= 5 ? "Challenging" : "Simple"} - {ingredients.length} ingredients:
        </p>
        <Ingredients ingredients={ingredients} summary={!isDetail} withIntro />

        {/* Info button */}
        {!isDetail && (
          <p>
            <span
              className={"cb-drink-card__show-more"}
              onClick={cb_info_clicked}
            >
              {/* ESE-3 fa-minus oppure fa-plus */}
              <i className={"fa fa-info-circle"} />
              &nbsp;
              {infoShown ? "Less info" : "More info"}
            </span>
          </p>
        )}

        {/* Details info */}
        {infoShown && (
          <Fragment>
            <p>
              <Tag
                name={isAlcoholic ? "Alcoholic" : "Not alcoholic"}
                type={isAlcoholic ? {className: "warning", decoration:"underline"} : {className: "success"}}
              />
              {drink.strTags &&
                drink.strTags
                  .split(",")
                  .map(elem => <Tag key={elem} name={elem.trim()} />)}
              {drink.strIBA && <Tag name={drink.strIBA} />}
              {drink.strCategory && <Tag name={drink.strCategory} />}
              {drink.strGlass && (
                <TagClass icon={"fa-glass"} name={drink.strGlass} />
              )}
              <span onClick={cb_favourite_clicked}>
                <Tag icon={"fa-heart"} name={favourite ? "Favourite" : "Make favourite"} type={favourite ? {className: "success"} : {className: "disabled"}} />
              </span>
            </p>
            {drink.strInstructions && <p>{drink.strInstructions}</p>}
          </Fragment>
        )}

        {/* Other info ESE-2 strImageAttribution strCreativeCommonsConfirmed (ES: Long Island Tea) */}
        {strImageAttribution && (
          <div>
            Image by: {drink.strImageAttribution}
            {drink.strCreativeCommonsConfirmed ?
              <Tag name={"Creative common"} icon={"fa-ok"} type={{className: "success"}}/> :
              <Tag name={"Private"} icon={"fa-close"} type={{className: "warning"}}/>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default DrinkCard
