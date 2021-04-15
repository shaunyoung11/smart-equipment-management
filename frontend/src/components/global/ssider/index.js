import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
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
          <SubMenu title="设备管理" icon={<AppstoreOutlined />}>
            <Menu.Item key="#/addDevice" icon={<AppstoreAddOutlined />}>
              <Link className="link" to="/addDevice"></Link>
              添加设备
            </Menu.Item>
            <Menu.Item key="#/all" icon={<FileTextOutlined />}>
              <Link className="link" to="/all"></Link>
              设备列表
            </Menu.Item>
            <Menu.Item key="#/search" icon={<FileSearchOutlined />}>
              <Link className="link" to="/search"></Link>
              查找设备
            </Menu.Item>
            <Menu.Item key="#/info" icon={<InfoCircleOutlined />}>
              <Link className="link" to="/info"></Link>
              设备盘点
            </Menu.Item>
          </SubMenu>
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
