import React, { Component } from 'react';
import { Image, Table, Typography } from 'antd';
import store from '../../store';
import './style.scss';

const { Title, Text } = Typography;

class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      {
        title: '设备ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '当前持有者',
        dataIndex: 'holder',
        key: 'holder',
      },
      {
        title: '警报等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '照片记录',
        dataIndex: 'photo',
        key: 'photo',
        render: (url) => {
          return <Image src={url}></Image>;
        },
      },
    ];
  }
  render() {
    return (
      <div className="alarm">
        <Typography>
          <Title level={2}>设备报警记录</Title>
          <Text type="secondary">查看设备报警记录列表</Text>
        </Typography>
        <Table columns={this.state.tableHeader}></Table>
      </div>
    );
  }
}

export default Alarm;
