import * as React from "react"
import {useState} from "react";

function ClickCounter() {
  const [counter, setCounter] = useState(0)

  return (
    <div>
        <h2>Counter component:</h2>
      <div onClick={() => setCounter(counter+1)}>
        You clicked {counter} times
      </div>
    </div>
  )
}

export default ClickCounter
