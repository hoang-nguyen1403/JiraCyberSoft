import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../utils/setting';
import { AppDispatch } from '../configStore';

const initialState = {
  allUser: []
}

interface userDataType {
  key: string;
  userId: string;
  email: string;
  name: string;
  phoneNumber: number;
}
interface userApiDataType{
  userId: string;
  email: string;
  name: string;
  phoneNumber: number;
}

const userManagementReducer = createSlice({
  name: "userManagementReducer",
  initialState,
  reducers: {
    getAllUserAction:(state:any, action:PayloadAction<userDataType[]>)=>{
       state.allUser = action.payload;
    }
  }
});

export const {getAllUserAction} = userManagementReducer.actions

export default userManagementReducer.reducer

export const getAllUser = ()=>{
   return async(dispatch: AppDispatch)=>{
     try{
        const result = await http.get('/Users/getUser')
        let apiallUser:userApiDataType[] = result.data.content
        let allUser:any= apiallUser.map((prop, index)=>{
          return {...prop, "key": index}
        })
        const action = getAllUserAction(allUser)
        dispatch(action)
     }catch(err){
        console.log(err)
     }
   } 
}