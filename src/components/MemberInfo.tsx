import { Input, Col, Row } from "antd";
import React from "react";
const { Search } = Input;

interface MemberInfoType{
    userId: number,
    name:string,
    avatar: string,
    email:string,
    phoneNumber:number


}

type Props = {
    members ?: MemberInfoType[];
}

export default function MemberInfo({members}: Props) {

  const onSearch = (value: string) => console.log(value);
  const renderAvatar = () => {
        return <div className=" memberAvatar">
        <img src="https://ui-avatars.com/api/?name=Viet" alt="" />
      </div>
  };
  return (
    <div className="info">
      <div className="search-block">
        <Row>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
            {renderAvatar()}
        </Row>
      </div>
    </div>
  );
}
