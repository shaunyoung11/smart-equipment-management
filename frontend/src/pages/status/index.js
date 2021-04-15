import React, { Component } from 'react';
import { Image, Table, Typography } from 'antd';
import store from '../../store';
import {
  getDeviceCarryRecord,
  getDeviceCirculateRecord,
} from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    if (this.props.location.state) {
      window.sessionStorage.setItem(
        'deviceName',
        this.props.location.state.name
      );
      window.sessionStorage.setItem(
        'deviceId',
        this.props.location.state.deviceId
      );
    }
    // 改变函数 this 指向
    this.storeChange = this.storeChange.bind(this);
    // 设置仓库订阅
    this.unsubscribe = store.subscribe(this.storeChange);
  }
  render() {
    return (
      <div className="status">
        <Typography>
          <Title level={2}>{window.sessionStorage.getItem('deviceName')}</Title>
          <Text type="secondary">状态变更记录表</Text>
        </Typography>
        <Typography>
          <Title level={4}>设备带出记录</Title>
        </Typography>
        <Table dataSource={this.state.deviceCarryRecord}>
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
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
          <Column title="记录时间" dataIndex="warnTime" key="warnTime" />
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
            title="照片记录"
            dataIndex="carrierPhotoUrl"
            key="carrierPhotoUrl"
            render={(text, record) => {
              <Image src={text} alt={record.deviceId}></Image>;
            }}
          />
        </Table>
        <Typography>
          <Title level={4}>设备流通记录</Title>
        </Typography>
        <Table dataSource={this.state.deviceCirculateRecord}>
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
          <Column
            title="设备原持有者 ID"
            dataIndex="preHolderId"
            key="preHolderId"
          />
          <Column
            title="设备新持有者 ID"
            dataIndex="curHolderId"
            key="curHolderId"
          />
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
   * 仓库发生状态改变时，执行该函数
   */
  storeChange() {
    this.setState(store.getState());
  }
}

export default Status;
