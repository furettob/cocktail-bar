import * as React from "react"
import CounterChild from "./CounterChild"

{/* Un esempio minimale di componente funzionale con gestione dello stato
 per includerlo all'interno di un file aggiungere:
 - nell'area degli import: import ClickCounter from './ClickCounter' (da sostituire con il path fino al file ClickCounter.jsx
 - all'interno del return o del render, richiamare <ClickCounter/>
 */}

function Counter({counter, setCounterCallback}) {

  // [EXERCISE] console.log("Re-rendering Counter")

  return (
    <div>
      <h2>Counter component:</h2>
      <CounterChild/>
      <div onClick={() => setCounterCallback(counter+1)}>
        You clicked {counter} times
      </div>
    </div>
  )
}

export default Counter
