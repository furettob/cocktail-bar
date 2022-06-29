import * as React from "react"
import withData from "../hocs/withDataExample"
import withClock from "../hocs/withClockExample"
import withFuncClock from "../hocs/withClockFunctionalExample"

function Tag({ name, type, icon, data, formattedRange, selected, big, invertedw, clickCallback, children}) {

  return (
    <span
      className={
        "cb-tag" +
        (type?.className ? " cb-tag--" + type.className : "") +
        (type?.decoration ? " cb-tag--" + type.decoration : "") +
        (selected ? " cb-tag--selected" : "") +
        (big ? " cb-tag--big" : "") +
        (invertedw ? " cb-tag--invertedw" : "")
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
      {data && JSON.stringify(data)}
      {formattedRange && <span>{formattedRange}</span>}
      {children}
    </span>
  )
}

export const TagWithData = withData(Tag)
export const TagWithClock = withClock(Tag)
export const TagWithFuncClock = withFuncClock(Tag)
