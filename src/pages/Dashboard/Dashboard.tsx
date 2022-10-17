
  import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;



type Props = {};

export default function Dashboard({}: Props) {
  return (
    <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Outlet></Outlet> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
  );
}
