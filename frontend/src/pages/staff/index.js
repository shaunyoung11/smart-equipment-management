import { Button, Table, Typography } from 'antd';
// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import store from '../../store';

const { Title, Text } = Typography;
const { Column } = Table;

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      {
        title: '员工ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render: (text, record) => {
          return (
            <div className="btns">
              <Button className="item" type="primary"></Button>
              <Button className="item">修改设备状态</Button>
              <Button
                className="item"
                danger
                onClick={this.handleDeleteStaff(record)}
              >
                删除设备
              </Button>
            </div>
          );
        },
      },
    ];
  }
  render() {
    return (
      <div className="staff">
        <Typography>
          <Title level={2}>员工列表</Title>
          <Text type="secondary">查看员工列表</Text>
        </Typography>
        <Table>
          <Column title="员工 ID" dataIndex="id" key="id"></Column>
          <Column title="姓名" dataIndex="name" key="name"></Column>
          <Column title="性别" dataIndex="sex" key="sex"></Column>
          <Column title="操作" dataIndex="options" key="options"></Column>
        </Table>
      </div>
    );
  }

  handleDeleteStaff(item) {
    console.log(item.id);
  }
}

export default Staff;
