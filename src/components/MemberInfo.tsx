import { Input  , Col, Row } from 'antd'
import React from 'react'
const { Search } = Input;
type Props = {
}

export default function MemberInfo({}: Props) {
const onSearch = (value: string) => console.log(value);

  return (
    <div className='info'>
        <div className="search-block">
            <Row>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            <div className=" memberAvatar">
                <img src="https://ui-avatars.com/api/?name=Viet" alt="" />
            </div>
            </Row>
        

        </div>
    </div>
  )
}