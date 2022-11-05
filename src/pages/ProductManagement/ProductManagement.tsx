import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import type { InputRef} from 'antd';
import {Row, Col , Button, Input, Space, Table, Tag,PageHeader } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from "react-highlight-words"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { creatorType, getAllProject } from '../../redux/reducer/projectManagementReducer';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
type Props = {}

const routes = [
  {
    path: "index",
    breadcrumbName: "reactJiraClone",
  },
  {
    path: "first",
    breadcrumbName: "Project Management",
  },
];

interface DataType {
  key: string;
  id: string;
  description: string;
  projectName: string;
  creator: creatorType;
}

type DataIndex = keyof DataType;


export default function ProductManagement({}: Props) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const {allProject} = useSelector((state:RootState)=>state.projectManagementReducer)

  const dispatch:AppDispatch = useDispatch()
  useEffect(()=>{
    const actionAPI = getAllProject();
    dispatch(actionAPI)
  }, [])

  console.log(allProject)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              // close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      ...getColumnSearchProps('id'),
      render: (text) => <>{text}</>
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      width: '20%',
      ...getColumnSearchProps('projectName'),
      render: (text, record, index) => <> <NavLink to={`/dashboard/${record.id}`}>{text}</NavLink>
      </>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('description'),
      sorter: (a, b) => a.description.length - b.description.length,
      render: (text) => <>{ ReactHtmlParser(text) }</>
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      width: '10%',
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('creator'),
      render: (text, record, index ) =><Tag color="magenta">{text.name}</Tag>
    },
    {
      title: "Action",
      key: "action",
      width: '10%',
      render: (_, record) => (
        
        <Space size="middle">
          <a onClick={()=>{console.log("record",record)}}> <EditOutlined  style={{color: '#0747a6'}}/></a>
          <a><DeleteOutlined  style={{color: "red"}}/></a>
        </Space>
      ),
    }
  ];

  return (
    <div className='projectManagement'>
        <Col span={24}>
        <Row>
          <PageHeader
            className="site-page-header"
            title="User Management"
            breadcrumb={{ routes }}
          />
        </Row>
          <Row className='projectTableSection'>
            <h1>Project Management</h1>
            <Table columns={columns} dataSource={allProject}  className="projectTable"/>
          </Row>
        </Col>
    </div>
  )
}