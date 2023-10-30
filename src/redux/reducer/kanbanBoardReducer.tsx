import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../configStore';
import { http } from '../../utils/setting';
import { history } from '../../index';


const initialState = {
  members: {},
  projectDetail :{}
  
}

export interface detailProjectApiDataType{

}

interface MemberInfoType{
  userId: number,
  name:string,
  avatar: string,
  email:string,
  phoneNumber:number


}

const kanbanBoardReducer = createSlice({
  name: "kanbanBoardReducer",
  initialState,
  reducers: {
    getDetailProduct:(state,action:PayloadAction<detailProjectApiDataType[]>)=>{
      state.projectDetail = action.payload;
    },
    getMembers: (state, action:PayloadAction<MemberInfoType[]>)=>{
      state.members = action.payload
    }
  }
});

export const {getDetailProduct, getMembers} = kanbanBoardReducer.actions

export default kanbanBoardReducer.reducer


export const getProductDetailAPI = (params:any)=>{
  return async (dispatch: AppDispatch)=>{
    // b2 thực thi thunk
    let {id} = params
    try{
      // Project/getProjectDetail/{projectId}
      let result = await http.get(`/Project/getProjectDetail?id=${id}`)
      const action1 = getDetailProduct(result.data.content)
      dispatch(action1)
      const action2 = getMembers(result.data.content.members)
      dispatch(action2)

      }catch(err:any){
        if (err.response.status === 404){
          alert(err)
          history.push("/dashboard")
        }
         
      }
  }
}