import React, { Component } from 'react';
import { Table, Typography } from 'antd';
import store from '../../store';

const { Title, Text } = Typography;

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '持有者',
        dataIndex: 'holder',
        key: 'holder',
      },
    ];
    if (this.props.location.state) {
      window.sessionStorage.setItem(
        'deviceName',
        this.props.location.state.name
      );
    }
  }
  render() {
    return (
      <div className="status">
        <Typography>
          <Title level={2}>{window.sessionStorage.getItem('deviceName')}</Title>
          <Text type="secondary">状态变更记录表</Text>
        </Typography>
        <Table columns={this.state.tableHeader}></Table>
      </div>
    );
  }
}

export default Status;
