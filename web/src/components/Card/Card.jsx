import * as React from "react"
import PropTypes from "prop-types"

function Card({ children, align}) {
  return (
    <div className={ `cb-card`}>
      {children}
    </div>
  )
}

export default Card
