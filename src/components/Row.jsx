import * as React from 'react'

function Row({children, intro}) {
 
    return  (
        <div className="cb-row">
            <h4>{intro}</h4>
            {children}
        </div>
    )
}

export default Row