import * as React from "react"
import { useState, useEffect} from "react"
import Ingredients from "./Ingredients"
import Tag from "./Tag"
import DrinkHeader from "./DrinkHeader"
import "font-awesome/css/font-awesome.min.css"
import { getIngredients } from "../utils/dataHub"
import InfoSection from "./InfoSection"

function DrinkCard({ drink, isDetail }) {
  const [color, setColor] = useState("#034d86")


  // [EXERCISE]-11 This effect is completely for learning sake
  // What will happen if we delete the key attribute in DrinkCard, from the FavouriteList file?
  useEffect( () => {
    console.log("I'm mounting with drink: ", drink.strDrink)
    setTimeout(() => {
      console.log("Calling setState on: ", drink.strDrink)
      setColor("#458314")
    },10000)
    return () => { console.log("Cleaning up effect in DrinkCard: ", drink.strDrink) }
    }, []
  )

  const ingredients = getIngredients(drink)

  return (
    <div className={"cb-drink-card"}>
      {/* Header */}
      <DrinkHeader drink={drink} isDetail={isDetail} color={color}/>

      {/* Text info */}
      <div className="cb-drink-card__text-container">
        <h2 className={"cb-drink-card__title"}>{drink.strDrink} - {drink.idDrink}</h2>
        {/* [EXERCISE]-1 "Challenging" "Simple" a seconda del numero di ingredienti */}
        <p className="cb-copy--muted cb-copy--bold">
          {ingredients.length >= 5 ? "Challenging" : "Simple"} - {ingredients.length} ingredients:
        </p>
        <Ingredients ingredients={ingredients} summary={!isDetail} withIntro />

        <InfoSection drink={drink} isDetail={isDetail}/>

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

export default  DrinkCard
