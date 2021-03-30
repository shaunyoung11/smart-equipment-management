import React from 'react';
import { Layout } from 'antd';
import GlobalHeader from './components/global/GlobalHeader';
import GlobalBody from './components/global/GlobalBody';
import GlobalSideBar from './components/global/GlobalSideBar';
import GlobalFoot from './components/global/GlobalFoot';

const { Header, Sider, Content, Footer } = Layout;

function AppRouter() {
  return (
    <Layout>
      <Header className="light">
        <GlobalHeader></GlobalHeader>
      </Header>
      <Layout>
        <Sider>
          <GlobalSideBar></GlobalSideBar>
        </Sider>
        <Content>
          <GlobalBody></GlobalBody>
        </Content>
      </Layout>
      <Footer>
        <GlobalFoot></GlobalFoot>
      </Footer>
    </Layout>
  );
}

export default AppRouter;
