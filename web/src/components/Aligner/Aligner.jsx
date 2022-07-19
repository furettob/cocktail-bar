import * as React from "react"
import PropTypes from "prop-types"

function Aligner({ children, align}) {
  return (
    <div className={ `cb-aligner cb-aligner--${align}`}>
      {children}
    </div>
  )
}

Aligner.propTypes = {
  align: PropTypes.oneOf(['top-left', 'top-center', 'top-right','center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right']),
};

export default Aligner
