import * as React from 'react'

function Row({children, intro}) {
 
    return  (
        <div className="te-filters-row">
            <h4>{intro}</h4>
            {children}
        </div>
    )
}

export default Row