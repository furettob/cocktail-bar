import * as React from "react"
import { Fragment } from "react"
import "font-awesome/css/font-awesome.min.css"
import { Link } from "react-router-dom"

function DrinkHeader({ drink, favourite, cb_favourite_clicked, isDetail }) {

  return (
    <Fragment>
      <div className={"cb-drink-card__header"}>
        <div
          className={"cb-drink-card__favourite-button"}
          onClick={cb_favourite_clicked}
        >
          <div
            className={"cb-ct--pointer"}
          >
          <i className={"fa " + (favourite ? "fa-heart" : "fa-heart-o")} />
          </div>
        </div>
        <div>
          {
            isDetail ?
              <Link to={"/drinks/aaaa"}>
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
