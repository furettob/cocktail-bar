import * as React from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import {TagWithData, TagWithClock, TagWithFuncClock} from "./TagEnhanced"
import Tag from "./Tag"
import { useContext, useState } from "react"
import { auth } from '../utils/firebase'
import SignoutModal from "./SignoutModal"

function Header({onLanguageSwitch, currentLang}) {
  console.log("test header --> log only once")


  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      const x = await auth.signOut()
      setShowModal(false)
    }
    catch(error) {
      alert(error.message)
    }
  }

  const [showClock, setShowClock] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const renderModal = () => {
    if (showModal === true) {
      return (
        <SignoutModal onClose={() => { setShowModal(false)}} onSubmit={() => {handleSignOut()} } />
      )
    }
    return ""
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
        <div onClick={() => setShowClock(!showClock)}>
          Clock:
          {showClock && <TagWithFuncClock big invertedw name={"Live: "}/>}
        </div>
        {user && <Tag
          clickCallback={() => setShowModal(true)}
          name={"Signout"}
        />
        }
      </span>
      {renderModal()}
    </div>
  )
}

export default Header

