import * as React from 'react'

function Tag({name, type}) {

    return (
        <span className={"cb-tag" + (type ? " cb-tag--"+type : "")}>{name}</span>
    )
}

export default Tag