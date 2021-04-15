import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sheader from '../../components/global/sheader';
import Ssider from '../../components/global/ssider';
import Sfooter from '../../components/global/sfooter';
import AddDevice from '../addDevice';
import AddStaff from '../addStaff';
import All from '../all';
import Find from '../find';
import Status from '../status';
import Info from '../info';
import { Layout } from 'antd';
import './style.scss';
import Staff from '../staff';

const { Header, Sider, Content, Footer } = Layout;

function Index(props) {
  return (
    <Layout>
      <Header>
        <Sheader></Sheader>
      </Header>
      <Layout>
        <Sider>
          <Ssider></Ssider>
        </Sider>
        <Content>
          <Router>
            <Switch>
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
              <Route path="/addDevice" component={AddDevice}></Route>
              <Route path="/search" component={Find}></Route>
              <Route path="/all" component={All}></Route>
              <Route path="/status" component={Status}></Route>
              <Route path="/info" component={Info}></Route>
              <Route path="/addStaff" component={AddStaff}></Route>
              <Route path="/staff" component={Staff}></Route>
            </Switch>
          </Router>
        </Content>
      </Layout>
      <Footer>
        <Sfooter></Sfooter>
      </Footer>
    </Layout>
  );
}

export default Index;
