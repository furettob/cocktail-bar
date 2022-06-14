import * as React from "react"
import { Fragment } from "react"
import { NavLink } from "react-router-dom"

function Header(props) {
  return (
    <div className="cb-header">
      <NavLink
        to={"/drinks"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
        >
        Drinks
      </NavLink>
      <NavLink
        to={"/drink/11728"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Martini
      </NavLink>
      <NavLink
        to={"/favourites"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Favourites
      </NavLink>
    </div>
  )
}

export default Header

