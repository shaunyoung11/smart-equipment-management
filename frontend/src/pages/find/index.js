import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Table,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import store from '../../store';
import { getDeviceByName } from '../../store/actionCreators';
import './style.scss';
import axios from 'axios';

const { Title, Text } = Typography;
const { Column } = Table;

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.storeChange = this.storeChange.bind(this);
    this.handleDelDevice = this.handleDelDevice.bind(this);
    this.handleSearchDevice = this.handleSearchDevice.bind(this);
    this.unsubscribe = store.subscribe(this.storeChange);
  }

  render() {
    return (
      <div className="find">
        <Typography>
          <Title level={2}>查询设备信息</Title>
          <Text type="secondary">输入设备名称，查询设备信息</Text>
        </Typography>
        <Form>
          <Form.Item label="设备名称">
            <Input.Search
              allowClear
              placeholder="请输入设备名称进行查询"
              onSearch={this.handleSearchDevice}
            ></Input.Search>
          </Form.Item>
        </Form>
        <Table
          tableLayout="auto"
          scroll={{ x: true }}
          dataSource={this.state.deviceListFind}
          rowKey={(record) => {
            return record.deviceId + Date.now();
          }}
        >
          <Column
            title="设备名称"
            dataIndex="deviceName"
            key="deviceName"
            width={150}
          />
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
                    onConfirm={() => {
                      this.handleDelDevice(index, record.deviceId);
                    }}
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

  componentWillUnmount() {
    this.unsubscribe();
  }

  storeChange() {
    this.setState(store.getState());
  }

  handleSearchDevice(value) {
    console.log(value);
    window.sessionStorage.setItem('searchText', value);
    this.handleGetDeviceList();
  }

  handleGetDeviceList() {
    const value = window.sessionStorage.getItem('searchText');
    const action = getDeviceByName(value);
    store.dispatch(action);
  }

  /**
   * 删除设备
   * @param {Number} index 待删除记录的下标
   * @param {String} id 待删除设备的 id
   */
  handleDelDevice(index, id) {
    console.log(index, id);
    axios.delete('/device/delete?deviceId=' + id).then((res) => {
      console.log(res);
      if (res.data.success) {
        message.success('删除成功');
        this.handleGetDeviceList();
      } else {
        message.error('删除失败');
      }
    });
  }
}

export default Find;
