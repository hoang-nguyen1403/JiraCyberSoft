import { userInfo } from "os";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/configStore";
import {UserInfo} from '../redux/reducer/userReducer'

type Props = {};

export default function Navbar({}: Props) {
  const {userLogin} = useSelector((state: RootState) => state.userReducer);
  console.log(userLogin)
  const renderLogin = (userInfo: UserInfo) => {
    let avatar:string = userInfo.avatar
    let name:string = userInfo.name
    if (!userLogin) {
      return (
        <NavLink className="item-btn" to="/login">
          <i className="fa-solid fa-user"></i>
        </NavLink>
      );
    }
    return (
      <div className="avatar">
          <img src={avatar} alt="" className="avatarImg" />
          <div className='toolTip'>
            <p>{name}</p>
          </div>
      </div>
    )
  };
  return (
    <div className="navbar_left">
      <div className="top">
        <NavLink to="">
          <img className="logo" src="./logo.png" alt="logo" />
        </NavLink>
        <button className="item-btn">
          <i className="fa-solid fa-magnifying-glass default-icon"></i>
        </button>
        <button className="item-btn">
          <i className="fa-solid fa-plus default-icon"></i>
        </button>
      </div>
      <div className="bottom">
        {renderLogin(userLogin)}
        <button className="item-btn">
          <i className="fa-solid fa-question default-icon"></i>
        </button>
      </div>
    </div>
  );
}
