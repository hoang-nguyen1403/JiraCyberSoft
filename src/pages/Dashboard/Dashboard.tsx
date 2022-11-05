import { Breadcrumb, Layout, Menu, Col, Row, PageHeader } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MemberInfo from "../../components/MemberInfo";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getProductDetailAPI } from "../../redux/reducer/kanbanBoardReducer";

const { Header, Content, Footer, Sider } = Layout;

type Props = {};

export default function Dashboard({}: Props) {
  const params = useParams();
  const dispatch:AppDispatch = useDispatch()
  const getProductDetail = () => {
    let {id} = params
    if (id === undefined){
      return
    }
    const actionThunk = getProductDetailAPI(params);
    dispatch(actionThunk);
  };
  useEffect(()=>{
    getProductDetail()
  }, [])

  const {projectDetail} = useSelector((state:RootState)=>state.kanbanBoardReducer)

  console.log(projectDetail)

  const routes = [
    {
      path: "index",
      breadcrumbName: "reactJiraClone",
    },
    {
      path: "first",
      breadcrumbName: "Cyberboard",
    },
  ];
  return (
    <Layout className="dashboard">
      <Content style={{ margin: "0 16px" }} >
        <Col span={24} >
          <Row>
            <PageHeader
              className="site-page-header"
              title="Cyberboard"
              breadcrumb={{ routes }}
            />
          </Row>
          <Row className='info'>
            <MemberInfo></MemberInfo>
          </Row>
        </Col>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}
