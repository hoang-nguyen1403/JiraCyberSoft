import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { registerApi } from "../../redux/reducer/userReducer";

type Props = {};

export default function Register({}: Props) {
  interface userRegisterInfo {
    email: "";
    password: "";
    name: "";
    phoneNumber: "";
  }
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);

    dispatch(values);
  };
  return (
    <>
      <Form
        className="container"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: window.innerHeight }}
        >
          <h3 className="display-4 fw-semibold text-primary">Sign up</h3>
          <div className="mt-3 w-50">
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input name="email" size="large" placeholder="Email" />
            </Form.Item>
          </div>

          <div className="mt-3 w-50">
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 4, message: "Please input at least 4 characters" },
                { max: 8, message: "Please input from 4 to 8 characters" },
              ]}
            >
              <Input
                type="password"
                name="password"
                size="large"
                placeholder="Password"
              />
            </Form.Item>
          </div>

          <div className="mt-3 w-50">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input type="text" name="name" size="large" placeholder="Name" />
            </Form.Item>
          </div>

          <div className="mt-3 w-50">
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your Phonenumber!" },
              ]}
            >
              <Input
                type="text"
                name="phoneNumber"
                size="large"
                placeholder="Phonenumber"
              />
            </Form.Item>
          </div>
          <div className="d-flex justify-content-between">
            <Button htmlType="submit" type="primary" className="m-4 justi">
              Sign up
            </Button>
            <Button htmlType="submit" type="primary" className="m-4">
              Register
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
