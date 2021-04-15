import React, { Component } from 'react';
import { Image, Table, Typography } from 'antd';
import store from '../../store';
import './style.scss';
import { getInfo } from '../../store/actionCreators';

const { Title, Text } = Typography;
const { Column } = Table;

class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.state.tableHeader = [
      {
        title: '设备ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '当前持有者',
        dataIndex: 'holder',
        key: 'holder',
      },
      {
        title: '警报等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '照片记录',
        dataIndex: 'photo',
        key: 'photo',
        render: (url) => {
          return <Image src={url}></Image>;
        },
      },
    ];
  }
  render() {
    return (
      <div className="info">
        <Typography>
          <Title level={2}>设备盘点</Title>
          <Text type="secondary">查看设备盘点信息</Text>
        </Typography>
        <Typography>
          <Title level={4}>仓库整体信息</Title>
        </Typography>
        <Table dataSource={this.state.info}>
          <Column title="设备总数" dataIndex="allCount" key="dataIndex" />
          <Column
            title="外借设备数量"
            dataIndex="deviceOnLoan"
            key="deviceOnLoan"
          />
          <Column title="在库设备数量" dataIndex="inventory" key="inventory" />
        </Table>
        <Typography>
          <Title level={4}>外借设备列表</Title>
        </Typography>
        <Table dataSource={this.state.deviceListInStore}>
          <Column title="设备 ID" dataIndex="deviceId" key="deviceId" />
          <Column title="设备名称" dataIndex="deviceName" key="deviceName" />
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
   * 获取盘点信息
   */
  getInfo() {
    const action = getInfo();
    store.dispatch(action);
  }
}

export default Alarm;
