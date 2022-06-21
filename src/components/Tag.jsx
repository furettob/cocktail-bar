import * as React from "react"
import { useState } from "react"

function Tag({ name, type, icon, selected, big, clickCallback }) {

  /* ESE-1 State: add state to manage selection */

  return (
    <span
      className={
        "cb-tag" +
        (type?.className ? " cb-tag--" + type.className : "") +
        (type?.decoration ? " cb-tag--" + type.decoration : "") +
        (selected ? " cb-tag--selected" : "") +
        (big ? " cb-tag--big" : "")
      }
      onClick={ clickCallback && typeof clickCallback === 'function' ? () => {
        console.log("You clicked! Now I will call the callback")
        clickCallback()
      } : null}
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
