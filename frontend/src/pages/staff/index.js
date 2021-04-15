import { Button, Table, Typography } from 'antd';
// import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import store from '../../store';
import { getStaffList } from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.storeChange = this.storeChange.bind(this);
    this.unsubscribe = store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div className="staff">
        <Typography>
          <Title level={2}>员工列表</Title>
          <Text type="secondary">查看员工列表</Text>
        </Typography>
        <Table
          dataSource={this.state.staffList}
          rowKey={(record) => {
            return record.employeeId + Date.now();
          }}
        >
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
                    onClick={() => {
                      this.handleDeleteStaff(record);
                    }}
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

  /**
   * 生命周期函数 --- 组件挂载完成后执行
   */
  componentDidMount() {
    this.handleGetStaffList();
  }

  /**
   * 生命周期函数 --- 组件将要卸载时执行
   */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * 处理删除员工事件
   * @param {Object} item
   */
  handleDeleteStaff(item) {
    console.log(item.employeeId);
  }

  /**
   * 创建获取员工列表的 action
   */
  handleGetStaffList() {
    const action = getStaffList();
    store.dispatch(action);
  }

  /**
   * 监听仓库更新，用于仓库订阅中
   */
  storeChange() {
    this.setState(store.getState());
  }
}

export default Staff;
