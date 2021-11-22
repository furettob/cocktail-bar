import * as React from 'react'
import {Fragment, useState} from 'react'
import Ingredients from './Ingredients'
import Tag from './Tag'
import TagClass from './TagClass'
import 'font-awesome/css/font-awesome.min.css';

function DrinkCard({drink}) {

    const isAlcoholic = drink.strAlcoholic.toLowerCase() === "alcoholic"
    const [favourite, setFavourite] = useState(false)
    const [infoShown, setInfoShown] = useState(false)
    const cb_favourite_clicked = () => {
        setFavourite(!favourite)
    }
    const cb_info_clicked = () => {
        setInfoShown(!infoShown)
    }

    const ingredients = Array.from(Array(25).keys()).map( (elem, index) => {
            if (drink["strIngredient" + index]) {
                return {
                    "ingredient": drink["strIngredient" + index],
                    "measure": drink["strMeasure" + index] ? drink["strMeasure" + index].trim() : null
                }
            }
        }
    ).filter(elem => !!elem)

    return (
      <div className={"cb-drink-card"}>
          {/* Header */}
          <div className={"cb-drink-card__header"}>
              <div className={"cb-drink-card__favourite-button"} onClick={cb_favourite_clicked}>
                  <i className={"fa fa-glass"}/>
              </div>
          </div>

          {/* Thumb image */}
          <div className="cb-drink-card__thumb-container">
              <div className="cb-drink-card__thumb" style={{backgroundImage: `url(${drink.strDrinkThumb})`}}/>
          </div>

          {/* Text info */}
          <div className="cb-drink-card__text-container">

              {/* Basic info ... ESE-1: add strImageAttribution */}
              <h2 className={"cb-drink-card__title"}>
                  {drink.strDrink}
              </h2>
              {/* ESE-1 "Challenging" "Simple" a seconda del numero di ingredienti */}
              <p><Ingredients ingredients={ingredients}/></p>

              {/* Info button */}
              <p>
                  <span className={"cb-copy--muted"} onClick={cb_info_clicked}>
                      <i className={"fa fa-info-circle"}/>&nbsp;
                      {infoShown ? "Hide" : "Show more"}
                      {/* ESE-3 ternary operator <i className={"fa fa-chevron-up"}/> */}
                  </span>
              </p>

              {/* Details info */}
              { infoShown && (
                  <Fragment>
                      <p>
                          <Tag name={isAlcoholic ? "Alcoholic" : "Not alcoholic"} type={isAlcoholic ? "warning" : "success"}/>
                          {drink.strTags && drink.strTags.split(",").map( elem => <Tag key={elem} name={elem.trim()}/> )}
                          {drink.strIBA && <Tag name={drink.strIBA} />}
                          {drink.strCategory && <Tag name={drink.strCategory} />}
                          {drink.strGlass && <TagClass icon={"fa-glass"} name={drink.strGlass} />}
                      </p>
                      {drink.strInstructions && <p>{drink.strInstructions}</p>}
                  </Fragment>
              )}

              {/* Other info ESE-2 strImageAttribution strCreativeCommonsConfirmed (Long Island Tea) */}
          </div>
      </div>
    )
}

export default DrinkCard