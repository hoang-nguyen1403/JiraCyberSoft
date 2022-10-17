import { Col, Row } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
// import {AppDispatch} from "../../redux/configStore";
import { AppDispatch, RootState } from '../../redux/configStore';
import {LoginAPI} from "../../redux/reducer/userReducer"

interface userLoginInfo{
  email: string;
  passWord:string;
}

type Props = {};

export default function Login({}: Props) {
  const dispatch: AppDispatch = useDispatch()
  const onFinish = (values: userLoginInfo) => {
    console.log("Success:", values);
    const actionAPI = LoginAPI(values)
    dispatch(actionAPI)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login_page">
      <Row>
        <Col span={12} className="left-col"></Col>
        <Col span={12} className="right-col">
        <div className="login_form">
            <h3 className='form-title'>Login To Your Dashboard</h3>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='loginForm'
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                  wrapperCol={{ offset: 0, span: 10 }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="passWord"
                  wrapperCol={{ offset: 0, span: 10 }}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {/* <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button 
                  type="primary"
                   htmlType="submit"
                   className='login_btn'>
                    Login
                  </Button>
                </Form.Item>
                
              </Form>
            </div>
        </Col>
      </Row>
    </div>
  );
}
