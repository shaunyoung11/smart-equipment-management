import React, { Component } from 'react';
import { Button, message, Popconfirm, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import store from '../../store';
import './style.scss';
import { getDeviceList } from '../../store/actionCreators';
import axios from 'axios';

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
            return record.deviceId + Date.now();
          }}
          dataSource={this.state.deviceListAll}
        >
          {/* 设备名称列 */}
          <Column title="设备名称" dataIndex="deviceName" key="deviceName" />
          {/* 设备状态列 */}
          <Column
            title="设备状态"
            dataIndex="holderId"
            key="holderId"
            render={(text, record) => {
              if (text !== null) {
                // 如果当前持有者名称不为空，则显示 xxx 持有
                return <span className="lent">{text + ' 持有'}</span>;
              } else {
                // 若为空，则显示设备在库
                return <span className="in-store">在库</span>;
              }
            }}
          />
          {/* 设备保密性等级列 */}
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
          {/* 设备状态更新时间列 */}
          <Column
            title="状态更新时间"
            dataIndex="updateTime"
            key="updateTime"
          />
          {/* 可对设备进行的操作 */}
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
                  <Popconfirm
                    title="是否确认删除该设备？"
                    // 若确认删除设备，则调用相关函数对其进行删除
                    onConfirm={() => {
                      this.handleDelDevice(index, record.deviceId);
                    }}
                    // 取消删除动作会弹出提醒框
                    onCancel={() => {
                      message.info('取消删除操作');
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button className="item" danger>
                      删除设备
                    </Button>
                  </Popconfirm>
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
    this.handleGetDeviceList();
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

  // 获取设备列表函数
  handleGetDeviceList() {
    const action = getDeviceList();
    store.dispatch(action);
  }

  /**
   * 删除设备
   * @param {Number} index 待删除记录的下标
   * @param {String} id 待删除设备的 id
   */
  handleDelDevice(index, id) {
    console.log(index, id);
    // 调用后端借口，请求删除设备
    axios.delete('/device/delete?deviceId=' + id).then((res) => {
      console.log(res);
      if (res.data.success) {
        // 如果响应数据的 `data.success` 为 true，表示删除成功
        // 提示删除成功
        message.success('删除成功');
        // 重新获取设备列表并渲染
        this.handleGetDeviceList();
      } else {
        // 如果响应的数据该字段为 false，表示删除失败
        message.error('删除失败');
      }
    });
  }
}

export default All;
