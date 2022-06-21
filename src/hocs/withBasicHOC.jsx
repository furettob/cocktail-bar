import * as React from "react"

function withDummyClick(WrappedComponent, stuff) {
  function Wrapper(props) {
    const callback = () => {
      console.log("Dummy wrapper callback")
      if (typeof stuff === 'function') {
        console.log("Calling wrapped function")
        stuff()
      }
    }

    return (
      <span onClick={() => callback()}>inizio<WrappedComponent {...props}/>fine</span>
    )
  }

  return <Wrapper />
}

export default withDummyClick
