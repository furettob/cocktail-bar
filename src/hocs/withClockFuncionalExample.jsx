import React, {useState, useEffect} from "react"

export default function withFuncClock(WrappedComponent) {
  return function wrappedFuncClock(props) {

    //       this.state = {start:start || Date.now(), range:0, formattedRange:'now'}
    const start = props?.start ? props.start : Date.now()
    const [range, setRange] = useState(Date.now() - start)

    useEffect( () => {
      const interv = setInterval(
        () => {
          setRange(Date.now() - start)
        }, 5000
      )
      return () => {
        console.log("Unmounted wrappedFuncClock")
        clearInterval(interv)
      }
    }, [])

    let formattedRange = '---'
    const s = Math.floor(range/1000)
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
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      <WrappedComponent start={start} range={range} formattedRange={formattedRange} {...props} />
    )
  }
}
