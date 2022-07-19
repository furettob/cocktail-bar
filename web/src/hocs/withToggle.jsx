// HOC.js

import React, {Component} from 'react';

export default function Hoc(HocComponent, data, clickCallback){

  return class extends Component{
    constructor(props) {
      super(props);
      this.state = {
        data: data
      };
    }

    render(){
      return (
        <HocComponent data={this.state.data} {...this.props} onClick={() => clickCallback()} />
      );
    }
  }
}
