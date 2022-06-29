import * as React from "react"
import { NavLink } from "react-router-dom"
import { TagWithData, TagWithClock, TagWithFuncClock } from "./TagEnhanced"
import Tag from "./Tag"
import { useState, useContext } from "react"
import { auth } from "../utils/firebase"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router-dom";
import SignoutModal from "./SignoutModal"

function Header({onLanguageSwitch, currentLang}) {
  console.log("test header --> log only once")

  const [showClock, setShowClock] = useState(true)
  const [showModal, setShowModal] = useState(false)

  let history = useHistory()
  const { user } = useContext(AuthContext)

  const handleSignout = async () => {
    try {
      await auth.signOut()
      history.push("/drinks");
    } catch (e) {
      console.error("ERRORE AL SIGNOUT::: ", e)
    }
  }

  const handleModalSignout = () => {
    setShowModal(true)
  }

  const renderModal = () => {
    if (showModal) {
      return (
        <SignoutModal onClose={() => setShowModal(false)}
                      onSubmit={() => handleSignout()}
                      onClickAway={() => {
                        console.log("Oh baby, don't click away!!!")
                      }}
        />
      )
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
      {!user && <NavLink
        to={"/login"}
        className={ isActive => "cb-navlink " + (isActive === true ? "cb-navlink--active" : "")}
      >
        Login
      </NavLink>}
      <span className={"cb-navlink"} onClick={() => setShowClock(!showClock)}>
        {showClock ? <TagWithFuncClock big invertedw name={"Live: "}/> : <Tag big invertedw  name={"paused"}/>}
      </span>
      <span className={"cb-navlink"}>
        {user && <Tag big invertedw name={"Signout"} clickCallback={handleModalSignout}/>}
      </span>
      {renderModal()}
    </div>
  )
}

export default Header

