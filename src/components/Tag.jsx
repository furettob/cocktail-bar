import * as React from "react"
import { useState } from "react"

function Tag({ name, type, icon }) {

  /* ESE-1 State: add state to manage selection */

  return (
    <span
      className={
        "cb-tag" +
        (type?.className ? " cb-tag--" + type.className : "") +
        (type?.decoration ? " cb-tag--" + type.decoration : "")
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
