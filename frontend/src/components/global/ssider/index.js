import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  AlertOutlined,
  AppstoreOutlined,
  AppstoreAddOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  UserOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import './style.scss';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

class Ssider extends Component {
  state = {};
  render() {
    return (
      <div className="s-sider">
        <Menu mode="inline" theme="dark" selectedKeys={[window.location.hash]}>
          <Menu.Item key="#/addDevice" icon={<AppstoreAddOutlined />}>
            <Link className="link" to="/addDevice"></Link>
            添加设备
          </Menu.Item>
          <SubMenu title="设备状态管理" icon={<AppstoreOutlined />}>
            <Menu.Item key="#/search" icon={<FileSearchOutlined />}>
              <Link className="link" to="/search"></Link>
              查找设备
            </Menu.Item>
            <Menu.Item key="#/all" icon={<FileTextOutlined />}>
              <Link className="link" to="/all"></Link>
              设备列表
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="#/alarm" icon={<AlertOutlined />}>
            <Link className="link" to="/alarm"></Link>
            设备报警记录
          </Menu.Item>
          <SubMenu title="人员管理" icon={<UserOutlined />}>
            <Menu.Item key="#/addStaff" icon={<UsergroupAddOutlined />}>
              <Link className="link" to="/addStaff"></Link>
              添加员工
            </Menu.Item>
            <Menu.Item key="#/staff" icon={<UnorderedListOutlined />}>
              <Link className="link" to="/staff"></Link>
              员工列表
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default withRouter(Ssider);
