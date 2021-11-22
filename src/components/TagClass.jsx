import * as React from 'react'
import {Component} from "react"

export default class TagClass extends Component {

    constructor(props) {
        super(props)
        this.state = {clicked: false}
    }

    onClick = () => {
        console.log("clicked!!!")
        this.setState(prevState => ({ clicked: !prevState.clicked}))
    }

    render() {
        return (
            <span className={"cb-tag" +
                (this.props.type ? " cb-tag--" + this.props.type : "") +
                (this.state.clicked ? " cb-tag--selected" : "")}
                onClick={this.onClick}
            >
                {this.props.icon && <span><i className={"fa " + this.props.icon}/>&nbsp;</span>}
                {this.props.name}
            </span>
        )
    }
}

