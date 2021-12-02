import * as React from "react"
import { useState } from "react"

function Tag({ name, type, icon }) {

  const [selected, setSelected] = useState(false)

  /* ESE-5 State: add state to manage selection */

  return (
    <span
      className={
        "cb-tag cb-ct--pointer" +
        (type?.className ? " cb-tag--" + type.className : "") +
        (type?.decoration ? " cb-tag--" + type.decoration : "") +
        (selected ? " cb-tag--selected" : "")
      }
      onClick={() => setSelected(!selected)}
    >
      {icon && (
        <span>
          <i className={"fa " + icon} />
          &nbsp;
        </span>
      )}
      {name}
    </span>
  )
}

export default Tag
