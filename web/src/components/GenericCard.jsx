import * as React from "react"
import "font-awesome/css/font-awesome.min.css"


function GenericCard({children}) {

  return (
    <div className={"cb-drink-card"}>
      <div className={"cb-generic-card"}>
        {children}
      </div>
    </div>
  )
}

export default  GenericCard
