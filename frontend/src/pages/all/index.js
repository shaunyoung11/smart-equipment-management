import React, { Component } from 'react';
import { Button, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';

import store from '../../store';
import './style.scss';
import { getDeviceList } from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class All extends Component {
  constructor(props) {
    super(props);
    // 从仓库获取 state
    this.state = store.getState();
    // 绑定 this 指针
    this.storeChange = this.storeChange.bind(this);
    this.handleDelDevice = this.handleDelDevice.bind(this);
    // 订阅与取消订阅
    this.unsubscribe = store.subscribe(this.storeChange);
    // 将表头抽离，避免更改 state 时将表头冲刷掉
  }

  render() {
    console.log(this.state.deviceListAll);
    return (
      <div className="all">
        {/* 首部标题 */}
        <Typography>
          <Title level={2}>设备列表</Title>
          <Text type="secondary">查看所有设备列表</Text>
        </Typography>
        {/* 数据表格 */}
        <Table
          rowKey={(record) => {
            return record.deviceName + Date.now();
          }}
          dataSource={this.state.deviceListAll}
        >
          <Column title="设备名称" dataIndex="deviceName" key="deviceName" />
          <Column
            title="设备状态"
            dataIndex="holderId"
            key="holderId"
            render={(text, record) => {
              console.log(record);
              if (text !== null) {
                // 如果当前持有者名称不为空，则显示 xxx 持有
                return <span className="lent">{text + ' 持有'}</span>;
              } else {
                // 若为空，则显示设备在库
                return <span className="in-store">在库</span>;
              }
            }}
          />
          <Column
            title="保密性等级"
            dataIndex="deviceLevel"
            key="deviceLevel"
            render={(text, record) => {
              if (text === 1) {
                // 保密性等级为 1，设备为常规设备
                return <span className="normal device-level">常规设备</span>;
              } else if (text === 2) {
                // 保密性等级为 2，设备为重要设备
                return <span className="important device-level">重要设备</span>;
              } else {
                // 保密性等级为 3，设备为保密设备
                return <span className="secret device-level">保密设备</span>;
              }
            }}
          />
          <Column
            title="状态更新时间"
            dataIndex="updateTime"
            key="updateTime"
          />
          <Column
            title="操作"
            dataIndex="options"
            key="options"
            render={(text, record, index) => {
              return (
                // 按钮容器
                <div className="btns">
                  {/* 查看变更记录 */}
                  <Button className="item" type="primary">
                    <Link
                      to={{
                        pathname: '/status',
                        state: { name: record.deviceName, id: record.deviceId },
                      }}
                    >
                      查看状态变更记录
                    </Link>
                  </Button>
                  {/* 修改设备状态 */}
                  <Button className="item">修改设备状态</Button>
                  {/* 删除设备 */}
                  <Button
                    className="item"
                    danger
                    onClick={this.handleDelDevice(index)}
                  >
                    删除设备
                  </Button>
                </div>
              );
            }}
          />
        </Table>
      </div>
    );
  }

  /**
   * 组件挂载完成时，向 store 发起获取设备列表的请求
   */
  componentDidMount() {
    const action = getDeviceList();
    store.dispatch(action);
  }

  /**
   * 组件生命周期结束时，取消掉订阅器
   */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * 监听仓库更改
   */
  storeChange() {
    this.setState(store.getState());
  }

  /**
   * 删除设备
   * @param {Number} index
   */
  handleDelDevice(index) {
    console.log(index);
  }
}

export default All;
