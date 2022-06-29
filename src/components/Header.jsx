import * as React from "react"
import { NavLink } from "react-router-dom"
import { TagWithData, TagWithClock, TagWithFuncClock } from "./TagEnhanced"
import Tag from "./Tag"
import { useState } from "react"

function Header({onLanguageSwitch, currentLang}) {
  console.log("test header --> log only once")

  const [showClock, setShowClock] = useState(true)

  return (
    <div className="cb-header">
      <NavLink
        to={"/drinks"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
        >
        Drinks
      </NavLink>
      <NavLink
        to={"/favourites"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Favourites
      </NavLink>
      <NavLink
        to={"/ingredients"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Ingredients
      </NavLink>
      <NavLink
      to={"/author"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Author
        </NavLink>
      {["en", "de", "it", "es", "fr"].map( elem =>
        <span className={"cb-navlink " + (elem === currentLang ? "cb-navlink--active" : "")}
              onClick={ () => onLanguageSwitch(elem.toLocaleLowerCase())}
              key={elem}>
            {elem.toUpperCase()}
          </span>
      ) }
      <span className={"cb-navlink"} onClick={() => setShowClock(!showClock)}>
        {showClock ? <TagWithFuncClock big invertedw name={"Live: "}/> : <Tag big invertedw  name={"paused"}/>}
      </span>
    </div>
  )
}

export default Header

