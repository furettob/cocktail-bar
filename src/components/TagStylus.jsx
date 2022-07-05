import * as React from "react"
import './TagStylus.styl';


function TagStylus({ name, type, icon, selected, big, clickCallback }) {

  /* ESE-1 State: add state to manage selection */

  return (
    <span
      className={
        "cb-st-tag" +
        (type?.className ? " cb-st-tag--" + type.className : "") +
        (type?.decoration ? " cb-st-tag--" + type.decoration : "") +
        (selected ? " cb-st-tag--selected" : "") +
        (big ? " cb-st-tag--big" : "")
      }
      onClick={ clickCallback && typeof clickCallback === 'function' ? () => {
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

export default TagStylus
