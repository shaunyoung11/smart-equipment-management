// 导入 react
import React, { Component } from 'react';
// 导入 antd 组件
import { Table, Typography } from 'antd';
// 导入 redux store
import store from '../../store';
// 导入获取设备带出信息以及设备交接记录方法
import {
  getDeviceCarryRecord,
  getDeviceCirculateRecord,
} from '../../store/actionCreators';
// 导入样式文件
import './style.scss';

const { Title, Text } = Typography;
const { Column } = Table;

class Status extends Component {
  constructor(props) {
    super(props);
    // 初始化 state
    this.state = store.getState();
    // 将路由传值保存在 sessionStorage 中
    if (this.props.location.state) {
      // 保存设备名称
      window.sessionStorage.setItem(
        'deviceName',
        this.props.location.state.name
      );
      // 保存设备 ID
      window.sessionStorage.setItem('deviceId', this.props.location.state.id);
    }
    // 改变函数 this 指向
    this.storeChange = this.storeChange.bind(this);
    // 设置仓库订阅
    this.unsubscribe = store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div className="status">
        {/* 页面标题 */}
        <Typography>
          <Title level={2}>{window.sessionStorage.getItem('deviceName')}</Title>
          <Text type="secondary">状态变更记录表</Text>
        </Typography>
        {/* 带出报警记录小标题 */}
        <Typography>
          <Title level={4}>带出报警记录</Title>
        </Typography>
        {/* 带出报警记录表格 */}
        <Table
          dataSource={this.state.deviceCarryRecord}
          rowKey={(record) => {
            return record.warnTime + Date.now();
          }}
        >
          {/* 设备 ID 列 */}
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
          {/* 设备状态列 */}
          <Column
            title="设备状态"
            dataIndex="principalId"
            key="principalId"
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
          {/* 记录时间列 */}
          <Column title="记录时间" dataIndex="warnTime" key="warnTime" />
          {/* 报警等级列 */}
          <Column title="报警等级" dataIndex="warnLevel" key="warnLevel" />
          {/* 照片记录列 */}
          <Column
            title="照片记录"
            dataIndex="carrierPhotoUrl"
            key="carrierPhotoUrl"
            render={(text, record) => {
              if (text === null) {
                // 如果无照片记录，则携带者合法
                return '携带者合法';
              } else {
                // 若有照片记录，则展示记录照片
                return <img className="warnPhoto" src={text} alt="" />;
              }
            }}
          />
        </Table>
        {/* 设备流通记录小标题 */}
        <Typography>
          <Title level={4}>设备流通记录</Title>
        </Typography>
        {/* 设备流通记录数据 */}
        <Table
          dataSource={this.state.deviceCirculateRecord}
          rowKey={(record) => {
            return record.updateTime + Date.now();
          }}
        >
          {/* 设备 ID 列 */}
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
          {/* 设备原持有者 ID 列 */}
          <Column
            title="设备原持有者 ID"
            dataIndex="preHolderId"
            key="preHolderId"
            render={(text) => {
              if (text === null) {
                // 如果无原持有者，则原持有者为在库
                return '在库';
              } else {
                // 否则显示设备原持有者 ID
                return text;
              }
            }}
          />
          {/* 设备新持有者 ID 列 */}
          <Column
            title="设备新持有者 ID"
            dataIndex="curHolderId"
            key="curHolderId"
            render={(text) => {
              if (text === null) {
                // 若设备现无持有者，则显示在库
                return '在库';
              } else {
                // 否则显示当前持有者 ID
                return text;
              }
            }}
          />
          {/* 更新时间列 */}
          <Column title="更新时间" dataIndex="updateTime" key="updateTime" />
        </Table>
      </div>
    );
  }

  /**
   * 生命周期函数 --- 组件挂载后执行
   */
  componentDidMount() {
    const getCarryAction = getDeviceCarryRecord(
      window.sessionStorage.getItem('deviceId')
    );
    const getCirculateAction = getDeviceCirculateRecord(
      window.sessionStorage.getItem('deviceId')
    );
    store.dispatch(getCarryAction);
    store.dispatch(getCirculateAction);
  }

  /**
   * 生命周期函数 --- 租价卸载后运行
   */
  componentWillUnmount() {
    this.unsubscribe();
  }

  /**
   * 仓库发生状态改变时，执行该函数
   */
  storeChange() {
    this.setState(store.getState());
  }
}

export default Status;
