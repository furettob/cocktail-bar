import * as React from 'react'

function Row(props) {
 
    return  (
        <div className="te-filters-row">
            {props.children}
        </div>
    )
}

export default Row