import React, { Component } from 'react';
import './ComponentName.scss';

// ComponentPage
export default class ComponentName extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    console.log(this.props);

    this.setBreadcrumb();
  }

  render() {
    return (
      <div className="ComponentClassName">
        <h1>ComponentContent</h1>
      </div>
    );
  }

  // 设置面包屑参数
  setBreadcrumb() {
    let arr = [
      { name: '面包屑名称1' },
      { path: '/a/a', name: '面包屑名称2' }
    ];

    this.props.setBreadcrumb(arr);
  }
}