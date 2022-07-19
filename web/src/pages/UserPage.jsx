import * as React from "react"
import Row from "../components/Row"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function FavouritePage() {

  const {user} = useContext(AuthContext)

  console.log("User page for: ", user)

  return (
    <div>
      <Row>
        <h1>Hello {user?.customData?.username}</h1>
      </Row>
    </div>
  )
}

export default FavouritePage
