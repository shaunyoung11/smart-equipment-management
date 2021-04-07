import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  AlertOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FileSyncOutlined,
} from '@ant-design/icons';
import './style.scss';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

class Ssider extends Component {
  state = {};
  render() {
    return (
      <div className="s-sider">
        <Menu mode="inline" theme="dark">
          <Menu.Item icon={<AppstoreAddOutlined />}>
            <Link className="link" to="/add"></Link>
            添加设备
          </Menu.Item>
          <SubMenu title="设备状态管理" icon={<AppstoreOutlined />}>
            <Menu.Item icon={<FileSearchOutlined />}>
              <Link className="link" to="/search"></Link>
              搜索设备
            </Menu.Item>
            <Menu.Item icon={<FileTextOutlined />}>
              <Link className="link" to="/all"></Link>
              设备列表
            </Menu.Item>
          </SubMenu>
          <Menu.Item icon={<AlertOutlined />}>
            <Link className="link" to="/alarm"></Link>
            设备报警记录
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Ssider);
