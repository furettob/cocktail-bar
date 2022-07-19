import React from "react"
// This function takes a component...
export default function withData(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={"dati aggiuntivi!"} {...this.props} />;
    }
  };
}
