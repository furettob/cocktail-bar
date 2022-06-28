import React from "react"

export default function withFilter(WrappedComponent, initialQuery, filterItems) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {query:initialQuery, set:this.props.initialSet || []}
    }

    hqc = (e) => {
      e.preventDefault()
      this.setState(prevState => { return {...prevState, query: e.target.value}});
      console.log("this.props.initialSet:: ", this.props.initialSet)
      const newSet = this.props.initialSet.filter( (item) => filterItems(item, e.target.value))
      console.log("new set: ", newSet)
      this.setState(prevState => { return {...prevState, set: newSet}});
    }

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
