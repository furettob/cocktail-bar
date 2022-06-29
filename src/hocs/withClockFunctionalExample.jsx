import React, { useEffect, useState } from "react"

export default function withFuncClock(WrappedComponent, start) {
  return function x(props) {

    const [start, setStart] = useState(props.start ? props.start : Date.now())
    const [timespan, setTimespan] = useState(Date.now() - start)

    useEffect( () => {
      // ... that takes care of the subscription...
      //DataSource.addChangeListener(this.handleChange);
      const interval = setInterval( () => {
        //console.log("Tick tock::: ", Date.now() - start)
        setTimespan(Date.now() - start)
        // return       clearInterval(this.interval)
      },5000)
    }, [])


    const s = Math.floor(timespan/1000)
    //console.log("Tick tock ssss::: ", s)

    let formattedRange = '---'
    switch (true) {
      case (s < 10):
        formattedRange = 'now'
        break;
      case (s < 20):
        formattedRange = 'moments ago'
        break;
      case (s < 60):
        formattedRange = `${s} sec`
        break;
      case (s < 1200):
        formattedRange = `${Math.floor(s/60)} min`
        break;
      default:
        formattedRange = `A long time ago, in a galaxy far far away`
        break;
    }

    return (
      <WrappedComponent start={start} range={timespan} formattedRange={formattedRange} {...props} />)
    }
}
