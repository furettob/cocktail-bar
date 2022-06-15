import * as React from "react"
import { Fragment, useState } from "react"
import Ingredients from "./Ingredients"
import Tag from "./Tag"
import TagClass from "./TagClass"
import DrinkHeader from "./DrinkHeader"
import "font-awesome/css/font-awesome.min.css"
import { getIngredients } from "../utils/dataHub"
import { LanguageContext } from "../context/LanguageContext"

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
      <DrinkHeader drink={drink} favourite={favourite} cb_favourite_clicked={cb_favourite_clicked} isDetail={isDetail}/>

      {/* Text info */}
      <div className="cb-drink-card__text-container">
        <h2 className={"cb-drink-card__title"}>{drink.strDrink} - {drink.idDrink}</h2>
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
              {infoShown ? <i className={"fa fa-minus"} /> : <i className={"fa fa-plus"} />}
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
            <LanguageContext.Consumer>
              {value => {
                console.log("LANG val is ", value)
                let instr = "strInstructions"
                if (value !== "en") {
                  instr = "strInstructions" + value.toUpperCase()
                }

                return drink[instr] ?
                  <p>{drink[instr]}</p> :
                  drink["strInstructions"] ?
                    <p>{drink["strInstructions"]}</p> :
                    <p>No description available</p>
              }}
            </LanguageContext.Consumer>
          </Fragment>
        )}
      </div>
      {/* Other info ESE-2 strImageAttribution strCreativeCommonsConfirmed (ES: Long Island Tea) */}
      {drink.strImageAttribution && (
        <div className={"cb-ph-16 cb-pv-8"}>
          <hr/>
          <span class={"cb-copy cb-copy--muted"}>Image by: {drink.strImageAttribution}</span>&nbsp;
          {drink.strCreativeCommonsConfirmed ?
            <Tag name={"Creative common"} icon={"fa-check"} type={{className: "success"}}/> :
            <Tag name={"Private"} icon={"fa-close"} type={{className: "warning"}}/>
          }
        </div>
      )}
    </div>
  )
}

export default DrinkCard
