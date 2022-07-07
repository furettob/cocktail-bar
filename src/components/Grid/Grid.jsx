import * as React from "react"

function GridCol({ children, colSpan }) {
  return <div className={`cb-grid__col cb-grid__col--${colSpan}`}>{children}</div>
}

function Grid({ children }) {
  return (
    <div className="cb-grid">
      {children}
    </div>
  )
}

Grid.Column = GridCol

export default Grid
