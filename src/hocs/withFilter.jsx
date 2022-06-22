import React from "react"

export default function withFilter(WrappedComponent, initialQuery) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {query:initialQuery, set:this.props.initialSet || []}
    }

    hqc = (e) => {
      e.preventDefault()
      this.setState(prevState => { return {...prevState, query: e.target.value}});
      const newSet = this.props.initialSet.filter( ing => ing.strIngredient1.indexOf(e.target.value) > -1)
      console.log("new set: ", newSet)
      this.setState(prevState => { return {...prevState, set: newSet}});
    }

    componentDidMount() {
      // this.setState(prevState => { return {...prevState, query: initialQuery, set:set}});
    }

    componentWillUnmount() {
    }

    render() {
      return <WrappedComponent set={this.state.set} handleQueryChange={this.hqc} query={this.state.query} {...this.props} />;
    }
  };
}
