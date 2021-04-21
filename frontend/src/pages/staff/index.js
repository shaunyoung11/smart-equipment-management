// 导入 react
import React, { Component } from 'react';
// 导入 antd 组件
import { Button, message, Table, Typography } from 'antd';
// 导入 axios 库
import axios from 'axios';
// 导入 redux store
import store from '../../store';
// 导入获取员工列表方法
import { getStaffList } from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class Staff extends Component {
  constructor(props) {
    super(props);
    // 初始化 state
    this.state = store.getState();
    // 改变 this 指向
    this.storeChange = this.storeChange.bind(this);
    // 添加仓库数据订阅
    this.unsubscribe = store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div className="staff">
        {/* 页面标题 */}
        <Typography>
          <Title level={2}>员工列表</Title>
          <Text type="secondary">查看员工列表</Text>
        </Typography>
        {/* 员工列表表格 */}
        <Table
          dataSource={this.state.staffList}
          rowKey={(record) => {
            return record.employeeId + Date.now();
          }}
        >
          {/* 员工 ID 列 */}
          <Column title="员工 ID" dataIndex="employeeId" key="employeeId" />
          {/* 员工姓名列 */}
          <Column title="姓名" dataIndex="employeeName" key="employeeName" />
          {/* 性别列 */}
          <Column
            title="性别"
            dataIndex="employeeGender"
            key="employeeGender"
          />
          {/* 账号激活状态列 */}
          <Column
            title="激活状态"
            dataIndex="activeTag"
            key="activeTag"
            render={(text) => {
              if (text === true) {
                // 若 activeTag 为 true，则为已激活
                return <span className="actived">已激活</span>;
              } else {
                // 否则为未激活状态
                return <span className="not-actived">未激活</span>;
              }
            }}
          />
          {/* 对员工进行操作 */}
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
                      // 删除员工方法
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
    axios.delete('/user/delete?userId=' + item.employeeId).then((res) => {
      if (res.data.success) {
        message.success('删除成功');
        this.handleGetStaffList();
      } else {
        message.error('删除失败');
      }
    });
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
