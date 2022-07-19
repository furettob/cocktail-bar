import * as React from "react"
import { Fragment, useState } from "react"
import Tag from "../Tag"
import TagClass from "../TagClass"
import { LanguageContext } from "../../context/LanguageContext"
import {FavouriteContext} from "../../context/FavouriteContext"
import withToggle from "../../hocs/withToggleExample"

function InfoSection({ drink, isDetail, toggleStatus, toggleFunction }) {
  const isAlcoholic = drink.strAlcoholic.toLowerCase() === "alcoholic"
  //const [infoShown, setInfoShown] = useState(isDetail)
  const infoShown = toggleStatus

  const cb_info_clicked = () => {
    //setInfoShown(!infoShown)
    toggleFunction()
  }

  return (
    <div>
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
              <FavouriteContext.Consumer>
                {
                  ({favouriteList, toggleFavouriteFunction, isFavourite}) =>
                    <span onClick={() => toggleFavouriteFunction(drink.idDrink, drink.strDrink)}>
                         {isFavourite && isFavourite(drink.idDrink, drink.strDrink, favouriteList)
                           ? <Tag selected icon="fa-heart" name="Favourite" type={{className:"success"}} />
                           : <Tag icon="fa-heart" name="Make favourite" type={{className:"disabled"}} />
                         }
                  </span>
                }
              </FavouriteContext.Consumer>
            </p>
            <LanguageContext.Consumer>
              {value => {
                let instr = "strInstructions"
                if (value !== "en") {
                  instr = "strInstructions" + (value && typeof value === "string" && value.toUpperCase())
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
  )
}

export default  withToggle(InfoSection)
