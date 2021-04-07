import { Button, Form, Input, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import store from '../../store';

const { Title, Text } = Typography;

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      // 设备ID
      {
        title: '设备ID',
        dataIndex: 'id',
        key: 'id',
      },
      // 设备名称
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      },
      // 设备状态
      {
        title: '设备状态',
        dataIndex: 'status',
        key: 'status',
      },
      // 当前持有者
      {
        title: '当前持有者',
        dataIndex: 'holder',
        key: 'holder',
      },
      // 保密性等级
      {
        title: '保密性等级',
        dataIndex: 'level',
        key: 'level',
      },
      // 状态更新时间
      {
        title: '状态更新时间',
        dataIndex: 'time',
        key: 'time',
      },
      // 操作
      {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render: (text, record) => {
          return (
            <div className="btns">
              <Button type="primary">
                <Link
                  to={{
                    pathname: '/status',
                    state: { name: record.name, id: record.id },
                  }}
                >
                  查看状态变更记录
                </Link>
              </Button>
              <Button>修改设备状态</Button>
              <Button danger>删除设备</Button>
            </div>
          );
        },
      },
    ];
  }

  render() {
    return (
      <div className="find">
        <Typography>
          <Title level={2}>查询设备信息</Title>
          <Text type="secondary">输入设备名称，查询设备信息</Text>
        </Typography>
        <Form>
          <Form.Item label="设备名称">
            <Input.Search
              allowClear
              placeholder="请输入设备名称进行查询"
              onSearch={this.handleSearchDevice}
            ></Input.Search>
          </Form.Item>
        </Form>
        <Table columns={this.state.tableHeader}></Table>
      </div>
    );
  }

  handleSearchDevice(value) {
    console.log(value);
  }
}

export default Find;
