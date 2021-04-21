// 引入 react
import React, { Component } from 'react';
// 引入 antd 组件
import { Table, Typography } from 'antd';
// 引入 redux store
import store from '../../store';
// 引入样式文件
import './style.scss';
// 引入获取设备盘点信息函数
import { getInfo } from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class Alarm extends Component {
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
      <div className="info">
        {/* 页面标题 */}
        <Typography>
          <Title level={2}>设备盘点</Title>
          <Text type="secondary">查看设备盘点信息</Text>
        </Typography>
        {/* 模块小标题 */}
        <Typography>
          <Title level={4}>仓库整体信息</Title>
        </Typography>
        {/* 设备信息概览表格 */}
        <Table dataSource={this.state.info}>
          {/* 设备总数列 */}
          <Column title="设备总数" dataIndex="allCount" key="dataIndex" />
          {/* 外借设备数量统计列 */}
          <Column
            title="外借设备数量"
            dataIndex="deviceOnLoan"
            key="deviceOnLoan"
          />
          在库设备数量统计列
          <Column title="在库设备数量" dataIndex="inventory" key="inventory" />
        </Table>
        {/* 外借设备列表节标题 */}
        <Typography>
          <Title level={4}>外借设备列表</Title>
        </Typography>
        {/* 外借设备列表表格 */}
        <Table dataSource={this.state.deviceListInStore}>
          {/* 设备 ID 列 */}
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
          {/* 设备名称列 */}
          <Column title="设备名称" dataIndex="deviceName" key="deviceName" />
          {/* 设备状态列 */}
          <Column
            title="设备状态"
            dataIndex="holderId"
            key="holderId"
            width={150}
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
            width={150}
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
            width={200}
          />
        </Table>
      </div>
    );
  }

  /**
   * 生命周期函数 --- 组件挂载后执行
   */
  componentDidMount() {
    this.getInfo();
  }

  /**
   * 生命周期函数 --- 组件卸载时调用
   */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * 获取盘点信息
   */
  getInfo() {
    const action = getInfo();
    store.dispatch(action);
  }

  /**
   * 仓库状态变更时触发
   */
  storeChange() {
    this.setState(store.getState());
  }
}

export default Alarm;
