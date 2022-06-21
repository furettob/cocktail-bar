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

    console.log("PROPSS:::: ", props)

    return (
      <WrappedComponent {...props} onClick={() => callback()}/>
    )
  }

  return <Wrapper x={"aaa"}/>
}

export default withDummyClick
