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
    </div>
  )
}

export default Header

