import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Row, Col } from "antd";
const { Sider } = Layout;

type Props = {};

export default function MenuBar({}: Props) {
  const [collapsedWidth, setCollapsedWidth] = useState(240);
  const [shouldHideMenuBar, setShouldHideMenuBar] = useState({
    display: "block",
  });
  const [icon, setIcon] = useState(<i className="fa-solid fa-less-than"></i>);
  const [boardStyle, setBoardStyle] = useState("menu_item actived")
  const [projectStyle, setProjectStyle] = useState("menu_item ")
  const [creatingProjectStyle, setCreatingProjectStyle] = useState("menu_item ")
  const [userStyle, setUserStyle] = useState("menu_item")
  const colSpanLeft:number = 6
  const colSpanRight:number = 18
  
  return (
    <Sider width={collapsedWidth} theme="light" className="slider_bar">
      <div className="menubar_content" style={shouldHideMenuBar}>
        <div className="header_logo">
          <Row className="intro-logo">
            <Col span={colSpanLeft} className="logo-left">
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
          <Row className={boardStyle} onClick={()=>{
            setBoardStyle("menu_item actived")
            setProjectStyle("menu_item ")
            setCreatingProjectStyle("menu_item ")
            setUserStyle("menu_item ")
          }}>
            <Col span={colSpanLeft} className="item_left">
              <p className="item_logo">
                <TableOutlined className="item_icon" />
              </p>
            </Col>
            <Col span={colSpanRight} className="item_right">
              <NavLink to="/dashboard" className="mylink">
                {" "}
                <p className="item_title">Kanban Board</p>
              </NavLink>
            </Col>
          </Row>
          <Row className={projectStyle} onClick={()=>{
            setBoardStyle("menu_item")
            setProjectStyle("menu_item actived")
            setCreatingProjectStyle("menu_item ")
            setUserStyle("menu_item ")
          }}>
            <Col span={colSpanLeft} className="item_left">
              <p className="item_logo">
                <DesktopOutlined className="item_icon" />
              </p>
            </Col>
            <Col span={colSpanRight} className="item_right">
              <NavLink to="/productManagement" className="mylink">
                {" "}
                <p className="item_title">Project Management</p>
              </NavLink>
            </Col>
          </Row>
          <Row className={creatingProjectStyle} onClick={()=>{
            setBoardStyle("menu_item")
            setProjectStyle("menu_item")
            setCreatingProjectStyle("menu_item actived")
            setUserStyle("menu_item ")
          }}>
            <Col span={colSpanLeft} className="item_left">
              <p className="item_logo">
                <FileOutlined className="item_icon" />
              </p>
            </Col>
            <Col span={colSpanRight} className="item_right">
              <NavLink to="/taskManagement" className="mylink" >
                <p className="item_title">Create Project</p>
              </NavLink>
            </Col>
          </Row>
          <hr style={{ width: "100%" }} />
          <Row className={userStyle} onClick={()=>{
            setBoardStyle("menu_item")
            setProjectStyle("menu_item")
            setCreatingProjectStyle("menu_item")
            setUserStyle("menu_item actived")
          }}>
            <Col span={colSpanLeft} className="item_left">
              <p className="item_logo">
                <UserOutlined className="item_icon" />
              </p>
            </Col>
            <Col span={colSpanRight} className="item_right" >
              <NavLink to="/userManagement" className="mylink" >
                <p className="item_title">User management</p>
              </NavLink>
            </Col>
          </Row>
        </div>
      </div>
      <button
        className="collapsed-btn"
        onClick={() => {
          if (collapsedWidth === 240) {
            setCollapsedWidth(20);
            setShouldHideMenuBar({ display: "none" });
            setIcon(<i className="fa-solid fa-greater-than"></i>);
            return;
          }
          setCollapsedWidth(240);
          setShouldHideMenuBar({ display: "block" });
        }}
      >
        {icon}
      </button>
    </Sider>
  );
}
