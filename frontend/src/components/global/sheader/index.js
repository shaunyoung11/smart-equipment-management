import { Typography } from 'antd';
import './style.scss';

const { Title } = Typography;

function Sheader() {
  return (
    <div className="s-header">
      <a href="localhost:3000">
        <Title level={4} className="title">
          智慧设备管理系统
        </Title>
      </a>
    </div>
  );
}

export default Sheader;
