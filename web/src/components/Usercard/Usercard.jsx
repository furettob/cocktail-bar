import * as React from "react"
import { useState } from "react"

function Usercard({ userdata }) {
  if (!userdata) {
    return ""
  }

  const [favouriteAll, setFavouriteAll] = useState(false)
  const [createdAll, setCreatedAll] = useState(false)

  return (
    <div className={ `cb-usercard`}>
    </div>
  )
}

export default Usercard
