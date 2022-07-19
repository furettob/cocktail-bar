import React from "react"

export default function withClock(WrappedComponent, start) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {start:start || Date.now(), range:0, formattedRange:'now'}
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      //DataSource.addChangeListener(this.handleChange);
      this.interval = setInterval( () => {
        const r = Date.now() - this.state.start

        let formattedRange = '---'
        const s = Math.floor(r/1000)
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


        this.setState(prevState => { return {...prevState, range:r, formattedRange}})
      },5000)
    }

    componentWillUnmount() {
      //DataSource.removeChangeListener(this.handleChange);
      console.log("Clearing ", this.interval)
      clearInterval(this.interval)
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent start={this.state.start} range={this.state.range} formattedRange={this.state.formattedRange} {...this.props} />;
    }
  };
}
