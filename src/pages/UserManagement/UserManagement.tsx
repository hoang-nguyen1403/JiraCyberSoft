import React, { useState } from "react";
import { Row, Col, PageHeader, AutoComplete, Input, Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SelectProps } from "antd/es/select";
import {
  DesktopOutlined,
  FileOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
type Props = {};

const routes = [
  {
    path: "index",
    breadcrumbName: "First-level Menu",
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
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function UserManagement({}: Props) {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [open, setOpen] = useState(false);

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
        <Table columns={columns} dataSource={data} className='userTable'/>
        </Row>
      </Col>
    </div>
  );
}
