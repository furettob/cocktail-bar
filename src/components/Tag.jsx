import * as React from "react"
import { useState } from "react"

function Tag({ name, type, icon, selected }) {

  /* ESE-1 State: add state to manage selection */

  return (
    <span
      className={
        "cb-tag" +
        (type?.className ? " cb-tag--" + type.className : "") +
        (type?.decoration ? " cb-tag--" + type.decoration : "") +
        (selected ? " cb-tag--selected" : "")
      }
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
