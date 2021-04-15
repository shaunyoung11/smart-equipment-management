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
  }
  render() {
    return (
      <div className="staff">
        <Typography>
          <Title level={2}>员工列表</Title>
          <Text type="secondary">查看员工列表</Text>
        </Typography>
        <Table>
          <Column title="员工 ID" dataIndex="employeeId" key="employeeId" />
          <Column title="姓名" dataIndex="employeeName" key="employeeName" />
          <Column
            title="性别"
            dataIndex="employeeGender"
            key="employeeGender"
          />
          <Column
            title="激活状态"
            dataIndex="activeTag"
            key="activeTag"
            render={(text) => {
              if (text === true) {
                return <span className="actived">已激活</span>;
              } else {
                return <span className="not-actived">未激活</span>;
              }
            }}
          />
          <Column
            title="操作"
            dataIndex="options"
            key="options"
            render={(text, record) => {
              return (
                <div className="btns">
                  {/* 修改员工信息 */}
                  <Button className="item" type="primary">
                    修改员工信息
                  </Button>
                  {/* 删除员工 */}
                  <Button
                    className="item"
                    danger
                    onClick={this.handleDeleteStaff(record)}
                  >
                    删除员工
                  </Button>
                </div>
              );
            }}
          ></Column>
        </Table>
      </div>
    );
  }

  handleDeleteStaff(item) {
    console.log(item.id);
  }
}

export default Staff;
