import * as React from "react"
import {useState} from "react";


{/* Un esempio minimale di componente funzionale con gestione dello stato
 per includerlo all'interno di un file aggiungere:
 - nell'area degli import: import ClickCounter from './ClickCounter' (da sostituire con il path fino al file ClickCounter.jsx
 - all'interno del return o del render, richiamare <ClickCounter/>
 */}

function CounterChild({counter, setCounterCallback}) {

  // [EXERCISE]- console.log("Re-rendering CounterChild")

  return (
    <div>
        <h2>I'm counter child component:</h2>
    </div>
  )
}

export default CounterChild
