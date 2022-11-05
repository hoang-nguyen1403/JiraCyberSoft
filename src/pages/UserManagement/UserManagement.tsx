import React, { useEffect, useState } from "react";
import { Row, Col, PageHeader, AutoComplete, Input, Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SelectProps } from "antd/es/select";
import {
  UserOutlined,
} from "@ant-design/icons";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/reducer/userManagementReducer";
type Props = {};

const routes = [
  {
    path: "index",
    breadcrumbName: "reactJiraClone",
  },
  {
    path: "first",
    breadcrumbName: "User management",
  },
];

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

interface DataType {
  key: string;
  stt: string;
  email: string;
  name: string;
  phone: number;
  // tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "userId",
    dataIndex: "userId",
    key: "userId",
    render: (text) => <>{text}</>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <>{text}</>,
  },
  {
    title: "phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (text) => <>{text}</>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </Space>
    ),
  },
];
// https://jiranew.cybersoft.edu.vn/api/Users/deleteUser?id=3081


export default function UserManagement({}: Props) {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [open, setOpen] = useState(false);
  
  const {allUser} = useSelector((state:RootState)=>state.userManagementReducer);
  
  const dispatch: AppDispatch= useDispatch()
  useEffect(()=>{
    const actionAPI = getAllUser();
    dispatch(actionAPI)
  }, [])
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };
  return (
    <div className="user_management">
      <Col span={24}>
        <Row>
          <PageHeader
            className="site-page-header"
            title="User Management"
            breadcrumb={{ routes }}
          />
        </Row>
        <Row className="registerUser">
          <div>
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={() => setOpen(true)}
              className="registerBtn"
            >
              Register New User
            </Button>
            <Modal
              title="Modal 1000px width"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <p>some contents...</p>
              <p>some contents...</p>
              <p>some contents...</p>
            </Modal>
          </div>
        </Row>
        <Row className="searching">
          <AutoComplete
            className="searchBar"
            dropdownMatchSelectWidth={252}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
          >
            <Input.Search
              size="large"
              placeholder="input here"
              enterButton
              className="searchingBtn"
            />
          </AutoComplete>
        </Row>
        <Row className='userTableSection'>
          <Table columns={columns} dataSource={allUser} className='userTable'/>
        </Row>
      </Col>
    </div>
  );
}
