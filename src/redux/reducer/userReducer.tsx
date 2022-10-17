import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../index";
import {
  http,
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../utils/setting";
import { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../configStore";
export interface UserInfo {
  id: number,
  email: string;
  avatar: string;
  passWord: string;
  name: string;
  phoneNumber: string;
  accessToken: string;
}

export interface userLoginInfo {
  email: string;
  passWord: string;
}

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action: PayloadAction<UserInfo>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const LoginAPI = (userLogin: userLoginInfo) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/Users/signin", userLogin);
      // const action= getProfileAction(userLogin);
      // dispatch(action)
      console.log("----- user infor", result.data.content);
        let UserInfo = result.data.content;
        setStore(ACCESS_TOKEN, result.data.content.accessToken)
        const action= getProfileAPI(UserInfo);
        dispatch(action);
        history.push("/dashboard")
    } catch (err:any) {
      console.log(err.data.message);
      alert(err.data.message)
    }
  };
};

export const getProfileAPI = (accessToken = getStore(ACCESS_TOKEN)) => {
  return async (dispatch: AppDispatch) => {
      try {
          const result = await http.get(`/Users/getUser`)
          const action = getProfileAction(result.data.content);
          dispatch(action);
          let content = result.data.content
          // let userLogin = content.filter((userLogin:UserInfo)=>{
          //   return userLogin.id === '2424';
          // })
          console.log("----- user infor", content[169]);
          setStoreJson(USER_LOGIN,content[169]);

      }catch(err) {
          console.log(err);
      }
  }
}