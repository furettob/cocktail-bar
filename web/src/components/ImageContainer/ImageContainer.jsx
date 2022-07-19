import * as React from "react"
import PropTypes from "prop-types"

function ImageContainer({url, firstname, lastname}) {
  return (
    <div className={"cb-image"}>
      <div className={ `cb-image__inner`} style={url && { backgroundImage: `url(${url})` }}>
        {!url && <div className={ `cb-image__placeholder`}>{firstname && firstname.charAt(0)} {lastname && lastname.charAt(0)}</div>}
      </div>
    </div>
  )
}

ImageContainer.propTypes = {
  color: PropTypes.oneOf(['blue', 'green', 'red'])
};

export default ImageContainer
