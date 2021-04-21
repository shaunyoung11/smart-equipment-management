// 导入路由组件
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// 导入页面组件
import Sheader from '../../components/global/sheader';
import Ssider from '../../components/global/ssider';
import Sfooter from '../../components/global/sfooter';
import AddDevice from '../addDevice';
import AddStaff from '../addStaff';
import All from '../all';
import Find from '../find';
import Status from '../status';
import Info from '../info';
import Staff from '../staff';
// 导入 antd 组件
import { Layout } from 'antd';
// 导入样式文件
import './style.scss';

const { Header, Sider, Content, Footer } = Layout;

function Index(props) {
  return (
    <Layout>
      {/* 页面头部 */}
      <Header>
        <Sheader></Sheader>
      </Header>
      {/* 页面中间部分 */}
      <Layout>
        {/* 侧边栏 */}
        <Sider>
          <Ssider></Ssider>
        </Sider>
        {/* 内容区域 */}
        <Content>
          <Router>
            <Switch>
              {/* 系统默认页面 */}
              <Route
                path="/"
                exact
                component={() => {
                  return (
                    <div className="index-content">
                      <h2>欢迎使用智慧设备管理系统</h2>
                      <p>请选择左侧菜单栏功能</p>
                    </div>
                  );
                }}
              ></Route>
              {/* 添加设备页面 */}
              <Route path="/addDevice" component={AddDevice}></Route>
              {/* 查找设备页面 */}
              <Route path="/search" component={Find}></Route>
              {/* 设备列表页面 */}
              <Route path="/all" component={All}></Route>
              {/* 设备报警记录页面 */}
              <Route path="/status" component={Status}></Route>
              {/* 设备信息页面 */}
              <Route path="/info" component={Info}></Route>
              {/* 添加员工页面 */}
              <Route path="/addStaff" component={AddStaff}></Route>
              {/* 员工列表页面 */}
              <Route path="/staff" component={Staff}></Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
      {/* 页面底部 */}
      <Footer>
        <Sfooter></Sfooter>
      </Footer>
    </Layout>
  );
}

export default Index;
