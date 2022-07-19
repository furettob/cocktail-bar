import React from "react"

export default function withFilter(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {formValues:{...this.props.initialValues}, set: this.props.initialSet || []}
    }

    handleQueryParamsChange = (formValues) => {
      this.setState(prevState => { return {...prevState, formValues:{...formValues}}});
    }

    getSet = () => {
      const newSet = this.props.initialSet.filter( (item) => this.props.filterItems(item, this.state.formValues))
      console.log(`Filtering ${newSet.length} out of ${this.props.initialSet.length} items`)
      return newSet
    }

    render() {
      return <WrappedComponent set={this.getSet()} handleQueryParamsChange={this.handleQueryParamsChange} {...this.props} />;
    }
  };
}
