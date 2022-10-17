import { Col, Row } from "antd";
import React from "react";

type Props = {};

export default function Introduction({}: Props) {
  return (
    <Row className="intro-logo">
      <Col span={24} className="logo-left">
        <img className="logo-img" src="logo192.png"></img>
      </Col>
      {/* <Col span={20} className="logo-right">
        <Row>
          <h4 className="title"> React Jira Clone</h4>
          <p> Software</p>
        </Row>
      </Col> */}
    </Row>
  );
}
