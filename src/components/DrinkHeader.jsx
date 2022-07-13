import * as React from "react"
import { Fragment } from "react"
import "font-awesome/css/font-awesome.min.css"
import { Link } from "react-router-dom"
import {FavouriteContext} from "../context/FavouriteContext"

function DrinkHeader({ drink, isDetail }) {

  return (
    <Fragment> 
      <div className={"cb-drink-card__header"}>
        <FavouriteContext.Consumer>
          {
            ({favouriteList, toggleFavouriteFunction, isFavourite}) =>
              <div
                  className={"cb-drink-card__favourite-button"}
                  onClick={() => toggleFavouriteFunction(drink.idDrink, drink.strDrink)}
                >
                  <div
                    className={"cb-ct--pointer"}
                  >
                    <i className={"fa " + (isFavourite(drink.idDrink, drink.strDrink, favouriteList) ? "fa-heart" : "fa-heart-o")} />
                  </div>
                </div>
          }
        </FavouriteContext.Consumer>
        <div>
          {
            isDetail ?
              <Link to={"/drinks"}>
                Back
              </Link> :
              <Link to={"/drink/" + drink.idDrink}>
                Details
              </Link>
          }
        </div>
      </div>

      {/* Thumb image */}
      <div className="cb-drink-card__thumb-container">
        <div
          className="cb-drink-card__thumb"
          style={{ backgroundImage: `url(${drink.strDrinkThumb})` }}
        />
      </div>
    </Fragment>
  )
}

export default DrinkHeader
