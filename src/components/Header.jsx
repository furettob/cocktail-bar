import * as React from "react"
import { Fragment } from "react"
import "font-awesome/css/font-awesome.min.css"
import { NavLink } from "react-router-dom"

function DrinkHeader(props) {

  return (
    <Fragment>
      <div className={"cb-header"}>
        <NavLink
          to="/drinks"
          className={ isActive => {
            console.log(">>>>>>>>>>> ", isActive)
            return "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")
          }}
        >
          Drinks
        </NavLink>
        <NavLink
          to="/drink/11728"
          className={ isActive => {
            return "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")
          }}
        >
          Martini
        </NavLink>
        <NavLink
          to="/favourites"
          className={ isActive => {
            return "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")
          }}
        >
          Favourites
        </NavLink>
      </div>
    </Fragment>
  )
}

export default DrinkHeader
