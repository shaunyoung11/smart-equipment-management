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
import { BrowserRouter as Link } from 'react-router-dom';

const { SubMenu } = Menu;

function Ssider() {
  return (
    <div className="s-sider">
      <Menu mode="inline" theme="dark">
        <Menu.Item icon={<AppstoreAddOutlined />}>
          <Link to="/add">添加设备</Link>
        </Menu.Item>
        <SubMenu title="设备状态管理" icon={<AppstoreOutlined />}>
          <Menu.Item icon={<FileSearchOutlined />}>
            <Link to="/search">搜索设备</Link>
          </Menu.Item>
          <Menu.Item icon={<FileTextOutlined />}>
            <Link to="/list">设备列表</Link>
          </Menu.Item>
          <Menu.Item icon={<FileSyncOutlined />}>
            <Link to="/status">设备状态变更记录</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item icon={<AlertOutlined />}>
          <Link to="/alert">设备报警记录</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Ssider;
