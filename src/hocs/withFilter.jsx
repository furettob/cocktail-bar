import React from "react"

export default function withFilter(WrappedComponent, initialQuery, filterItems) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      console.log("Render withFilter with props: ", this.props)
      this.state = {query:initialQuery, set:this.props.initialSet || []}
    }

    hqc = (e) => {
      e.preventDefault()
      console.log("Name::: ", e.target.name, e.target.value)
      const newState = this.state
      newState[e.target.name] = e.target.value
      //console.log("this.props.initialSet:: ", this.props.initialSet)
      console.log("WILL SET STATE::: ", newState)
      this.setState(newState)
      const newSet = this.props.initialSet.filter( (item) => filterItems(item, this.state))
      console.log("new set: ", newSet)
      this.setState(prevState => { return {...prevState, set: newSet}});
    }

    /*const handleStartsWithChanged = (e) => {
      console.log(`Changing from ${startsWith} to ${!startsWith} ...  `, e)
      setStartWith(!startsWith)
    }*/

    componentDidMount() {
      // this.setState(prevState => { return {...prevState, query: initialQuery, set:set}});
      // console.log("Mounted with prop: ", this.props.initialSet)
      // this.setState(prevState => { return {...prevState, set:this.props.initialSet}});
    }

    componentWillUnmount() {
    }

    render() {
      return <WrappedComponent set={this.state.set} handleQueryChange={this.hqc} query={this.state.query} {...this.props} />;
    }
  };
}
