import * as React from "react"
import {useState} from "react";


{/* Un esempio minimale di componente funzionale con gestione dello stato
 per includerlo all'interno di un file aggiungere:
 - nell'area degli import: import ClickCounter from './ClickCounter' (da sostituire con il path fino al file ClickCounter.jsx
 - all'interno del return o del render, richiamare <ClickCounter/>
 */}

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
