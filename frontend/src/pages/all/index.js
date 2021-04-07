import React, { Component } from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import store from '../../store';

class All extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '设备状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '当前持有者',
        dataIndex: 'holder',
        key: 'holder',
      },
      {
        title: '保密性等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '状态更新时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render: (text, record) => {
          return (
            <div className="btns">
              <Button type="primary">
                <Link
                  to={{ pathname: '/status', state: { name: record.name } }}
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
    this.state.tableData = [
      {
        key: '1',
        name: 'no1',
        status: '已借出',
        holder: 'syy',
        level: '保密',
        time: '2021-04-07',
      },
    ];
  }
  render() {
    return (
      <div className="all">
        <Table
          columns={this.state.tableHeader}
          dataSource={this.state.tableData}
        ></Table>
      </div>
    );
  }
}

export default All;
