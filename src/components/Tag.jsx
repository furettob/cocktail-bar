import * as React from 'react'
import {useState} from "react"

function Tag({name, type, icon}) {

    const [selected, setSelected] = useState(false)
    return (
        <span className={"cb-tag" +
                (type ? " cb-tag--"+type : "") +
                (selected ? " cb-tag--selected" : "")}
              onClick={() => setSelected(!selected)}>
            {icon && <span><i className={"fa " + icon}/>&nbsp;</span>}
            {name}
        </span>
    )
}

export default Tag


