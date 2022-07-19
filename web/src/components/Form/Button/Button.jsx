import * as React from "react"

function Button(props) {
  const getClass = () => {
    let c = "cb-button"
    let b = "cb-button"
    if (props.fluid) {
      c += " "+b+"--fluid"
    }
    if (props.inverted) {
      c += " "+b+"--inverted"
    }
    if (props.pill) {
      c += " "+b+"--pill"
    }
    return c
  }
  return (
    <span {...props} className={getClass()}>{props.label}</span>
  )
}

export default Button
