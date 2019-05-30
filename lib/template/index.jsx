import React, { Component } from 'react';
import './style.scss';

// ComponentPage
export default class ComponentName extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="ComponentClassName">
        <h1>ComponentContent</h1>
      </div>
    );
  }
}