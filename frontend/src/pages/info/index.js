import React, { Component } from 'react';
import { Image, Table, Typography } from 'antd';
import store from '../../store';
import './style.scss';

const { Title, Text } = Typography;
const { Column } = Table;

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
      <div className="info">
        <Typography>
          <Title level={2}>设备盘点</Title>
          <Text type="secondary">查看设备盘点信息</Text>
        </Typography>
        <Table dataSource={this.state.info}>
          <Column title="设备总数" dataIndex="allCount" key="dataIndex" />
          <Column
            title="外借设备数量"
            dataIndex="deviceOnLoan"
            key="deviceOnLoan"
          />
          <Column title="在库设备数量" dataIndex="inventory" key="inventory" />
        </Table>
        <Typography>
          <Title level={4}>在库设备列表</Title>
        </Typography>
        <Table dataSource={this.state.deviceListInStore}></Table>
      </div>
    );
  }
}

export default Alarm;
