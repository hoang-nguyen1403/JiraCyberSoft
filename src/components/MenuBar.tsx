import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import Introduction from "../components/Introduction";
import { NavLink } from "react-router-dom";

import { Row, Col } from "antd";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  //   getItem("Jira Clone Project", "0", <NavLink to='/dashboard'><Introduction  /></NavLink>),
  getItem(
    "Kanban Board",
    "1",
    <NavLink to="/dashboard">
      <DesktopOutlined />
    </NavLink>
  ),
  getItem(
    "Product Management",
    "2",
    <NavLink to="/productManagement">
      <TableOutlined />
    </NavLink>
  ),
  //   getItem("", "",  <hr style={{width:"100%"}}/> ),
  getItem("Create Project", "4", <FileOutlined />),
  getItem("User Management", "9", <TeamOutlined />),
];

type Props = {};

export default function MenuBar({}: Props) {
  const [collapsed, setCollapsed] = useState(260);
  const [shouldHideMenuBar, setShouldHideMenuBar] = useState({display: "block"});

  return (
    <Sider
      //   collapsible
      //   collapsed={collapsed}
      //   onCollapse={(value) => setCollapsed(value)}
      width={collapsed}
      theme="light"
      className="slider_bar"
    >
      <div className="menubar_content" style={shouldHideMenuBar}>
        <div className="header_logo">
          <Row className="intro-logo">
            <Col span={6} className="logo-left">
              <img className="logo-img" src="logo192.png"></img>
            </Col>
            <Col span={16} className="logo-right">
              <Row>
                <h4 className="title"> React Jira Clone</h4>
                <p> Software</p>
              </Row>
            </Col>
          </Row>
        </div>
        
        <div className="body_content">
          <Row className="menu_item">
            <Col span={6} className="item_left">
              <p className="item_logo">
                  <TableOutlined className="item_icon"/>
              </p>
            </Col>
            <Col span={16} className="item_right">
              <p className="item_title">Kanban Board</p>
            </Col>
          </Row>
          <Row className="menu_item">
            <Col span={6} className="item_left">
              <p className="item_logo">
                  <DesktopOutlined className="item_icon"/>
              </p>
            </Col>
            <Col span={16} className="item_right">
              <p className="item_title">Project Management</p>
            </Col>
          </Row>
          <Row className="menu_item">
            <Col span={6} className="item_left">
              <p className="item_logo">
                  <FileOutlined className="item_icon"/>
              </p>
            </Col>
            <Col span={16} className="item_right">
              <p className="item_title">Create Project</p>
            </Col>
          </Row>
          <hr  style={{width: "100%"}}/>
          <Row className="menu_item">
            <Col span={6} className="item_left">
              <p className="item_logo">
                  <UserOutlined className="item_icon"/>
              </p>
            </Col>
            <Col span={16} className="item_right">
              <p className="item_title">User management</p>
            </Col>
          </Row>
        </div>
      </div>
      <button className='collapsed-btn' onClick={()=>{
        if (collapsed ==260){
            setCollapsed(20)
            setShouldHideMenuBar({display: "none"})
            return
        }
        setCollapsed(260)
        setShouldHideMenuBar({display: "block"})
      }}>
        {collapsed ===260 ? <i className="fa-solid fa-less-than"></i> : <i className="fa-solid fa-greater-than"></i>}
      </button>
    </Sider>
  );
}
