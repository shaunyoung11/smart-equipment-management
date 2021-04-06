import { BrowserRouter as Route } from 'react-router-dom';
import Sheader from '../../components/global/sheader';
import Ssider from '../../components/global/ssider';
import Sfooter from '../../components/global/sfooter';
import { Layout } from 'antd';
import './style.scss';

const { Header, Sider, Content, Footer } = Layout;

function Index() {
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
          <Route path="/" exact component={Index}></Route>
        </Content>
      </Layout>
      <Footer>
        <Sfooter></Sfooter>
      </Footer>
    </Layout>
  );
}

export default Index;
