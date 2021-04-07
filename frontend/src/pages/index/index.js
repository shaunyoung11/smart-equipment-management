import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sheader from '../../components/global/sheader';
import Ssider from '../../components/global/ssider';
import Sfooter from '../../components/global/sfooter';
import Add from '../add';
import All from '../all';
import Find from '../find';
import Status from '../status';
import Alarm from '../alarm';
import { Layout } from 'antd';
import './style.scss';

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
              <Route path="/add" component={Add}></Route>
              <Route path="/search" component={Find}></Route>
              <Route path="/all" component={All}></Route>
              <Route path="/status" component={Status}></Route>
              <Route path="/alert" component={Alarm}></Route>
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
