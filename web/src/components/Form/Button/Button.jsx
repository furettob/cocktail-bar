import * as React from "react"

function Button(props) {
  return (
    <span {...props} className={"cb-button"}>{props.label}</span>
  )
}

export default Button
