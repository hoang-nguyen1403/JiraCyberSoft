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
  getItem("Jira Clone Project", "0", <NavLink to='/dashboard'><Introduction  /></NavLink>),
  getItem("Kanban Board", "1", <NavLink to='/dashboard'><DesktopOutlined  /></NavLink>  ),
  getItem("Product Management", "2",  <NavLink to='/productManagement'><TableOutlined  /></NavLink> ),
  getItem("", "",  <hr style={{width:"100%"}}/> ),
  getItem("Create Project", "4", <UserOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("User Management", "9", <UserOutlined />),
];

type Props = {};

export default function MenuBar({}: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width="240"
      theme="light"
      className="slider_bar"
    >
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="menu_bar"
      />
    </Sider>
  );
}
