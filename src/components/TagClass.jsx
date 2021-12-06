import * as React from "react"
import { Component } from "react"

{/* Questo è lo STESSO componente Tag, ma espresso come Class component invece che come Functional component */}

export default class TagClass extends Component {
  constructor(props) {
    super(props)
    this.state = { clicked: false }
  }

  onClick = () => {
    this.setState(prevState => ({ clicked: !prevState.clicked }))
  }

  render() {
    return (
      <span
        className={
          "cb-tag" +
          (type?.className ? " cb-tag--" + type.className : "") +
          (type?.decoration ? " cb-tag--" + type.decoration : "") +
          (this.state.clicked ? " cb-tag--selected" : "")
        }
        onClick={this.onClick}
      >
        {this.props.icon && (
          <span>
            <i className={"fa " + this.props.icon} />
            &nbsp;
          </span>
        )}
        {this.props.name}
      </span>
    )
  }
}
