import * as React from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import {TagWithData, TagWithClock} from "./TagEnhanced"
import Tag from "./Tag"
import { Transition } from 'react-transition-group';
import { useContext } from "react"
import { auth } from '../utils/firebase'


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

  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const x = await auth.signOut()
    }
    catch(error) {
      alert(error.message)
    }
  }

  return (
    <div className="cb-header">
      <NavLink
        to={"/drinks"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Drinks
      </NavLink>
      {user && <NavLink
        to={"/favourites"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Favourites
      </NavLink>}
      <NavLink
        to={"/ingredients"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Ingredients
      </NavLink>
      {!user && <NavLink
        to={"/login"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Login
      </NavLink>}
      {["en", "de", "it", "es", "fr"].map( elem =>
        <span className={"cb-navlink " + (elem === currentLang ? "cb-navlink--active" : "")}
              onClick={ () => onLanguageSwitch(elem.toLocaleLowerCase())}
              key={elem}>
            {elem.toUpperCase()}
          </span>
      ) }
      <span className={"cb-navlink"}>
        <TagWithClock big invertedw name={"Live: "}/>
        {user && <Tag
          clickCallback={() => handleSignOut()}
          name={"Signout"}
        />
        }
      </span>
    </div>
  )
}

export default Header

