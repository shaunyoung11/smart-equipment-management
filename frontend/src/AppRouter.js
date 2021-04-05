import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import GlobalHeader from './components/global/GlobalHeader';
import GlobalSideBar from './components/global/GlobalSideBar';
import GlobalFoot from './components/global/GlobalFoot';
import Index from './pages/index';

const { Header, Sider, Content, Footer } = Layout;

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Header className="light">
          <GlobalHeader></GlobalHeader>
        </Header>
        <Layout>
          <Sider>
            <GlobalSideBar></GlobalSideBar>
          </Sider>
          <Content>
            <Route path="/" exact component={Index}></Route>
          </Content>
        </Layout>
        <Footer>
          <GlobalFoot></GlobalFoot>
        </Footer>
      </Layout>
    </Router>
  );
}

export default AppRouter;
