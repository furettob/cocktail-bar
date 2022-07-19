import * as React from "react"
import {Fragment, useState} from "react";

function Checkbox(props) {

  const [isChecked, setIsChecked] = useState(props.isChecked)

  //console.log('IN CHE STATO SONO?', isChecked)

  return (
    <Fragment>
      <div className={"cb-switch-wrapper"}>
        <span className={"cb-switch-label"}>
        {
          isChecked ? props.labelOn : props.labelOff
        }
        </span>
        <label className="cb-switch" htmlFor={props.id}>
          <input type="checkbox"
                 id={props.id}
                 checked={isChecked}
                 {...props}
                 onChange={(event) => {
            props.handleChange(event)
            setIsChecked(!isChecked)
          }}/>
          <div className="slider"></div>
        </label>
      </div>
    </Fragment>
  )

}

export default Checkbox;
