import * as React from "react"
import { Fragment, useState } from "react"
import "font-awesome/css/font-awesome.min.css"
import { Link } from "react-router-dom"

function DrinkHeader({ drink, favourite, cb_favourite_clicked }) {

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
          <Link to={`/drink/${drink.idDrink}`} params={{ drink: drink }}>
            <i className={"fa fa-list-ul"} />
            &nbsp;
            <span className={"cb-copy cb-copy--white"}>Details</span>
          </Link>
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
