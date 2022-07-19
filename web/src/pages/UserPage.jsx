import * as React from "react"
import Row from "../components/Row"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Usercard from "../components/Usercard/Usercard"

function FavouritePage() {

  const {user} = useContext(AuthContext)

  console.log("User page for: ", user)

  return (
    <div>
      <Row>
        <h1>{"Ciao " + (user?.customData?.username || "alcolista anonimo")}</h1>
      </Row>
      <Row>
      <Usercard userdata={user?.customData}/>
    </Row>
    </div>
  )
}

export default FavouritePage
