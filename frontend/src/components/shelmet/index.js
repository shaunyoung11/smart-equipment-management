import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Shelmet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Helmet titleTemplate="%s - 智能设备管理系统">
        <title>{this.props.title}</title>
      </Helmet>
    );
  }
}

export default Shelmet;
