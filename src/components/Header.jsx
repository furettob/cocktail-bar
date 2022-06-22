import * as React from "react"
import { NavLink } from "react-router-dom"
import {TagWithData, TagWithClock} from "./TagEnhanced"
import { Transition } from 'react-transition-group';

function Header({onLanguageSwitch, currentLang}) {
  console.log("test header --> log only once")

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

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
      {["en", "de", "it", "es", "fr"].map( elem =>
        <span className={"cb-navlink " + (elem === currentLang ? "cb-navlink--active" : "")}
              onClick={ () => onLanguageSwitch(elem.toLocaleLowerCase())}
              key={elem}>
            {elem.toUpperCase()}
          </span>
      ) }
      <span className={"cb-navlink"}>
        <TagWithData big invertedw>sss</TagWithData>
        <TagWithClock big invertedw name={"Live: "}/>
      </span>
    </div>
  )
}

export default Header

