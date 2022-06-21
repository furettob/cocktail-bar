import * as React from "react"

function withFiltering(WrappedComponent, stuff) {
  function Wrapper(props) {
    const callback = () => {
      console.log("Called wrapper callback")
      if (typeof stuff === 'function') {
        console.log("Calling wrapped function")
        stuff()
      }
    }

    return (
      <div onClick={() => callback()}>inizio<WrappedComponent {...props}/>fine</div>
    )
  }

  return <Wrapper />
}

export default withFiltering
