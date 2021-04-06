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

const { SubMenu } = Menu;

function Ssider() {
  return (
    <div className="s-sider">
      <Menu mode="inline" theme="dark">
        <Menu.Item icon={<AppstoreAddOutlined />}>添加设备</Menu.Item>
        <SubMenu title="设备状态管理" icon={<AppstoreOutlined />}>
          <Menu.Item icon={<FileSearchOutlined />}>搜索设备</Menu.Item>
          <Menu.Item icon={<FileTextOutlined />}>设备列表</Menu.Item>
          <Menu.Item icon={<FileSyncOutlined />}>设备状态变更记录</Menu.Item>
        </SubMenu>
        <Menu.Item icon={<AlertOutlined />}>设备报警记录</Menu.Item>
      </Menu>
    </div>
  );
}

export default Ssider;
